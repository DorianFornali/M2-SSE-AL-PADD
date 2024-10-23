//
// Created by Negruta Adrian on 22/10/2024.
//
#include "email_service.h"
#include <curl/curl.h>
#include <iostream>

namespace email_service {

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


void sendEmail(const std::vector<std::string>& emailList, const std::string& subject, const nlohmann::json& received_message_data)
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
}