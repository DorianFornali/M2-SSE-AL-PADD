#include "notification_service.h"
#include <../external/json/single_include/nlohmann/json.hpp>


using json = nlohmann::json;


/* 
If connected with the database for the POC 
    -: Retrieve the id from database with patient details 
    -: Format the email to be sent to his nurse/doctor/family etc.
*/

void handleAlertMessage(const std::string& id, const json& alertJson) {
    std::cout << "Handling alert message:" << std::endl;
    std::cout << "  Emergency Person ID: " << id << std::endl;  // Display the extracted ID
    std::cout << "  Emergency Type: " << alertJson["datatype"] << std::endl;
    std::cout << "  Value: " << alertJson["value"] << std::endl;
}

void handleMessage(const std::string& subject, const json& messageJson) {
    
    const std::string emergencyPrefix = "triggerEmergency.";
    // More constants to be added for other subjects

    if (subject.rfind(emergencyPrefix, 0) == 0) {
        // Extract ID from subject (everything after "triggerEmergency.")
        std::string id = subject.substr(emergencyPrefix.length());

        // Pass the extracted ID and message to the handler
        handleAlertMessage(id, messageJson);
    } else {
        std::cerr << "Unknown message subject: " << subject << std::endl;
    }
}

void onMessage(natsConnection *conn, natsSubscription *sub, natsMsg *msg, void *closure) {
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

// Function to subscribe to notifications
void subscribeNotifications() {
    natsConnection *conn = NULL;
    natsSubscription *subEmergency = NULL;
    natsSubscription *subReport = NULL;

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

        /* Subscribe to other messages */
        // Subscribe to reportRequest.> messages and other publishers
        // s = natsConnection_Subscribe(&subReport, conn, "reportRequest.>", onMessage, NULL);
        // if (s == NATS_OK) {
        //     std::cout << "Subscribed to 'reportRequest.>' subject." << std::endl;
        // } else {
        //     std::cerr << "Failed to subscribe: " << natsStatus_GetText(s) << std::endl;
        // }

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
