#include <../external/json/single_include/nlohmann/json.hpp>
#include <curl/curl.h>
#include <libpq-fe.h>
#include <iostream>
#include <string>


#include "notification_service.h"
using json = nlohmann::json;


/*
If connected with the database for the POC
    -: Retrieve the id from database with patient details
    -: Format the email to be sent to his nurse/doctor/family etc.
*/


namespace notification_service
{
    namespace
    {
        /* Constants for the topics that the service is listening on */
        const std::string kEmergencyPrefix = "triggerEmergency.";
        const std::string kReportHealthStatusNormalPrefix = "reportHealthStatus.normal.";
        const std::string kReportHealthStatusCriticalPrefix = "reportHealthStatus.critical.";
        const std::string kReportHealthStatusWarningPrefix = "reportHealthStatus.negative.";


        std::string concatenateEmails(const std::vector<std::string>& emailList)
        {
            std::string toField;
            for (const auto& email : emailList) {
                if (!toField.empty()) {
                    toField += ", ";  // Separate email addresses with commas
                }
                toField += email;
            }
            return toField;
        }


        static size_t payloadSource(void *ptr, size_t size, size_t nmemb, void *userp) {
            const char **payload = (const char **)userp;

            if (size == 0 || nmemb == 0 || ((size * nmemb) < 1)) {
                return 0;
            }

            if (*payload) {
                size_t len = strlen(*payload);
                memcpy(ptr, *payload, len);
                *payload += len;  // Advance pointer
                return len;
            }

            return 0;  // No more data to send
        }


        std::string formPayloadForEmail(const std::vector<std::string>& ToList, const std::string& From, const std::string& topic) {
            std::string payload;
            std::string toField = concatenateEmails(ToList);

            payload = "To: " + toField + "\r\n"
                      "From: " + From + "\r\n"
                      "Subject: ";

            if (topic == "Emergency") {
                payload += "Emergency Alert\r\n\r\nEmergency triggered!\r\n";
            } else if (topic == "Health Status Normal") {
                payload += "Health Status Normal\r\n\r\nThe patient's health status is normal.\r\n";
            } else if (topic == "Health Status Critical") {
                payload += "Critical Health Alert\r\n\r\nThe patient's health status is critical.\r\n";
            } else if (topic == "Health Status Warning") {
                payload += "Health Status Warning\r\n\r\nThe patient's health status is in warning state.\r\n";
            } else {
                payload += "Unknown Alert\r\n\r\nUnknown topic: " + topic + "\r\n";
            }

            // End the message with the required SMTP termination
            payload += "\r\n.\r\n";  // <--- This ends the message correctly

            return payload;
        }



        void sendEmail(const std::vector<std::string>& emailList, const std::string& subject, const json& received_message_data)
        {
            /*
             * inputs
             * :- email: email addresses of the recipients
             * :- payload : message to be sent
             */

            CURL *curl;
            CURLcode res = CURLE_OK;
            curl = curl_easy_init();
            if (curl) {
                curl_easy_setopt(curl, CURLOPT_USERNAME, "null");
                curl_easy_setopt(curl, CURLOPT_PASSWORD, "null");
                curl_easy_setopt(curl, CURLOPT_URL, "smtp://mailpit:1025");

                curl_easy_setopt(curl, CURLOPT_MAIL_FROM, "<no-reply@mail.com>");

                // Setup the recipients list for the SMTP "RCPT TO" field
                struct curl_slist *recipients = nullptr;
                for (const auto& email : emailList) {
                    recipients = curl_slist_append(recipients, email.c_str());
                }
                curl_easy_setopt(curl, CURLOPT_MAIL_RCPT, recipients);

                /*
                 * Payload for the email, using the updated formPayloadForEmail
                 */
                std::string payload_text = formPayloadForEmail(emailList, "no-reply@mail.com", subject);
                const char *payload = payload_text.c_str();
                curl_easy_setopt(curl, CURLOPT_READFUNCTION, payloadSource);
                curl_easy_setopt(curl, CURLOPT_READDATA, &payload);
                curl_easy_setopt(curl, CURLOPT_UPLOAD, 1L);
                curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L);


                res = curl_easy_perform(curl);  // send the email

                if (res != CURLE_OK) {
                    std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;
                }

                curl_slist_free_all(recipients);
                curl_easy_cleanup(curl);
            }
        }

        std::vector<std::string> getToContactEmailsFromDatabase(const std::string& id) {
            const char* dbHost = std::getenv("DB_HOST");
            const char* dbPort = std::getenv("DB_PORT");
            const char* dbName = std::getenv("DB_DATABASE");
            const char* dbUser = std::getenv("DB_USER");
            const char* dbPassword = std::getenv("DB_PASSWORD");

            std::string connInfo = "host=" + std::string(dbHost) +
                                   " port=" + std::string(dbPort) +
                                   " dbname=" + std::string(dbName) +
                                   " user=" + std::string(dbUser) +
                                   " password=" + std::string(dbPassword);

            PGconn* conn = PQconnectdb(connInfo.c_str());

            if (PQstatus(conn) != CONNECTION_OK) {
                std::cerr << "Connection to database failed: " << PQerrorMessage(conn) << std::endl;
                PQfinish(conn);
                return {};
            }

            // Modify the query to retrieve emails of users who are either 'nurse' or 'familycontact'
            std::string query =
                "SELECT u.email "
                "FROM users u "
                "JOIN user_relations ur ON u.id = ur.related_user_id "
                "WHERE ur.user_id = '" + id + "' "
                "AND ur.relation_type IN ('NURSE', 'DOCTOR')";

            PGresult* res = PQexec(conn, query.c_str());

            if (PQresultStatus(res) != PGRES_TUPLES_OK) {
                std::cerr << "No data retrieved: " << PQerrorMessage(conn) << std::endl;
                PQclear(res);
                PQfinish(conn);
                return {};
            }

            // Collect all the emails
            std::vector<std::string> emails;
            for (int i = 0; i < PQntuples(res); i++) {
                emails.push_back(PQgetvalue(res, i, 0));
            }

            PQclear(res);
            PQfinish(conn);

            return emails;
        }

        void handleMessage(const std::string& subject, const json& messageJson) {
            std::string id;
            if (subject.rfind(kEmergencyPrefix, 0) == 0) {
                id = subject.substr(kEmergencyPrefix.length());
                sendEmail(getToContactEmailsFromDatabase(id), "Emergency", messageJson);
            } else if (subject.rfind(kReportHealthStatusNormalPrefix, 0) == 0) {
                id = subject.substr(kReportHealthStatusNormalPrefix.length());
                sendEmail(getToContactEmailsFromDatabase(id), "Health Status Normal", messageJson);
            } else if (subject.rfind(kReportHealthStatusCriticalPrefix, 0) == 0) {
                id = subject.substr(kReportHealthStatusCriticalPrefix.length());
                sendEmail(getToContactEmailsFromDatabase(id), "Health Status Critical", messageJson);
            } else if (subject.rfind(kReportHealthStatusWarningPrefix, 0) == 0) {
                id = subject.substr(kReportHealthStatusWarningPrefix.length());
                sendEmail(getToContactEmailsFromDatabase(id), "Health Status Warning", messageJson);
            } else {
                std::cerr << "Unknown message subject: " << subject << std::endl;
            }
        }

        void onMessage(natsConnection *conn, natsSubscription *sub, natsMsg *msg, void *closure) {
            /* Communication through json */
            std::string subject = natsMsg_GetSubject(msg);
            std::string serializedMessage(natsMsg_GetData(msg), natsMsg_GetDataLength(msg));

            std::cout << "Received message on subject: " << subject << std::endl;
            std::cout << "Message content: " << serializedMessage << std::endl;

            try {
                json messageJson = json::parse(serializedMessage);  // Parse JSON message
                handleMessage(subject, messageJson);
            }

            catch (const json::parse_error& e) {
                std::cerr << "Failed to parse JSON message: " << e.what() << std::endl;
            }

            natsMsg_Destroy(msg);
        }


    }


    // Function to subscribe to notifications
    void notificationServiceTopicsSubscription() {
        natsConnection *conn = NULL;
        natsSubscription *subEmergency = NULL;
        natsSubscription *subHealthStatusNormal = NULL;
        natsSubscription *subHealthStatusCritical = NULL;
        natsSubscription *subHealtStatusNegativeFormular = NULL;

        const char* natsUrl = std::getenv("NATS_URL");
        natsStatus s;
        int attempts = 0;

        // Retry connecting to NATS if the server is not available
        do {
            s = natsConnection_ConnectTo(&conn, natsUrl);
            if (s != NATS_OK) {
                std::cerr << "Failed to connect to NATS: " << natsStatus_GetText(s) << std::endl;
                std::cerr << "Retrying connection in 3 seconds..." << std::endl;
                nats_Sleep(3000);  // Wait for 3 seconds before retrying
                attempts++;
            }
        } while (s != NATS_OK && attempts < 5);  // Retry up to 5 times

        if (s == NATS_OK) {
            s = natsConnection_Subscribe(&subEmergency, conn, "triggerEmergency.>", onMessage, NULL);
            if (s == NATS_OK) {
                std::cout << "Subscribed to 'triggerEmergency.>' subject." << std::endl;
            } else {
                std::cerr << "Failed to subscribe: " << natsStatus_GetText(s) << std::endl;
            }

            s = natsConnection_Subscribe(&subHealthStatusNormal, conn, "reportHealthStatus.normal.>", onMessage, NULL);
            if (s == NATS_OK)
            {
                std::cout << "Subscribed to 'reportHealthStatus.normal.>' subject." << std::endl;
            }

            else {
                std::cerr << "Failed to subscribe: " << natsStatus_GetText(s) << std::endl;
            }

            s = natsConnection_Subscribe(&subHealthStatusCritical, conn, "reportHealthStatus.critical.>", onMessage, NULL);
            if (s == NATS_OK) {
                std::cout << "Subscribed to 'reportHealthStatus.critical.>' subject." << std::endl;
            } else {
                std::cerr << "Failed to subscribe: " << natsStatus_GetText(s) << std::endl;
            }

            s = natsConnection_Subscribe(&subHealtStatusNegativeFormular, conn, "reportHealthStatus.negative.>", onMessage, NULL);
            if (s == NATS_OK) {
                std::cout << "Subscribed to 'reportHealthStatus.negative.>' subject." << std::endl;
            } else {
                std::cerr << "Failed to subscribe: " << natsStatus_GetText(s) << std::endl;
            }


            while (true) {
                nats_Sleep(1000);
            }
        }

        // Cleanup NATS resources
        if (subEmergency != NULL) {
            natsSubscription_Destroy(subEmergency);
        }


        if (conn != NULL) {
            natsConnection_Destroy(conn);
        }
    }

}
