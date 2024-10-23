#include <curl/curl.h>
#include <iostream>
#include <string>

#include "notification_service.h"
#include "email_service.h"
#include "database_service.h"
#include <../external/nats.c/src/nats.h>

using json = nlohmann::json;


/*
If connected with the database for the POC
    -: Retrieve the id from database with patient details
    -: Format the email to be sent to his nurse/doctor/family etc.
*/


namespace notification_service
{
        /* Constants for the topics that the service is listening on */
    const std::string kEmergencyPrefix = "triggerEmergency.";
    const std::string kReportHealthStatusNormalPrefix = "reportHealthStatus.normal.";
    const std::string kReportHealthStatusCriticalPrefix = "reportHealthStatus.critical.";
    const std::string kReportHealthStatusWarningPrefix = "reportHealthStatus.negative.";

    void handleMessage(const std::string& subject, const json& messageJson) {
        std::string id;
        if (subject.rfind(kEmergencyPrefix, 0) == 0) {
            id = subject.substr(kEmergencyPrefix.length());
            email_service::sendEmail(database_service::getToContactEmailsFromDatabase(id), "Emergency", messageJson);
        } else if (subject.rfind(kReportHealthStatusNormalPrefix, 0) == 0) {
            id = subject.substr(kReportHealthStatusNormalPrefix.length());
            email_service::sendEmail(database_service::getToContactEmailsFromDatabase(id), "Health Status Normal", messageJson);
        } else if (subject.rfind(kReportHealthStatusCriticalPrefix, 0) == 0) {
            id = subject.substr(kReportHealthStatusCriticalPrefix.length());
            email_service::sendEmail(database_service::getToContactEmailsFromDatabase(id), "Health Status Critical", messageJson);
        } else if (subject.rfind(kReportHealthStatusWarningPrefix, 0) == 0) {
            id = subject.substr(kReportHealthStatusWarningPrefix.length());
            email_service::sendEmail(database_service::getToContactEmailsFromDatabase(id), "Health Status Warning", messageJson);
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