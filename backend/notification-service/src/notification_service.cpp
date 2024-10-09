#include "notification_service.h"
#include <iostream>
#include <nats.h>  // Use the correct path for nats.h

void sendNotification(const std::string& event) {
    // Initialize NATS connection
    natsConnection *conn = NULL;
    natsStatus s = natsConnection_ConnectTo(&conn, NATS_DEFAULT_URL);  // Connect to localhost NATS server

    if (s == NATS_OK) {
        s = natsConnection_PublishString(conn, "notifications", event.c_str());
        if (s == NATS_OK) {
            std::cout << "Notification event sent: " << event << std::endl;
        } else {
            std::cerr << "Failed to send notification: " << natsStatus_GetText(s) << std::endl;
        }
    } else {
        std::cerr << "Failed to connect to NATS: " << natsStatus_GetText(s) << std::endl;
    }
    // Cleanup NATS connection
    natsConnection_Destroy(conn);
}

void onMessage(natsConnection *conn, natsSubscription *sub, natsMsg *msg, void *closure) {
    std::cout << "Received notification: " << natsMsg_GetData(msg) << std::endl;
    natsMsg_Destroy(msg);  // Clean up the message
}

// Function to subscribe to notifications
void subscribeNotifications() {
    natsConnection *conn = NULL;
    natsSubscription *sub = NULL;
    natsStatus s = natsConnection_ConnectTo(&conn, NATS_DEFAULT_URL);

    if (s == NATS_OK) {
        s = natsConnection_Subscribe(&sub, conn, "notifications", onMessage, NULL);
        if (s == NATS_OK) {
            std::cout << "Subscribed to 'notifications' subject." << std::endl;
            // Keep the subscription alive for a while to receive messages
            nats_Sleep(10000);  // Keep the process running for 10 seconds
        } else {
            std::cerr << "Failed to subscribe: " << natsStatus_GetText(s) << std::endl;
        }
    } else {
        std::cerr << "Failed to connect to NATS: " << natsStatus_GetText(s) << std::endl;
    }

    // Cleanup NATS resources
    natsSubscription_Destroy(sub);
    natsConnection_Destroy(conn);
}
