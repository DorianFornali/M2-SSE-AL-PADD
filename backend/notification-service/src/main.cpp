#include "notification_service.h"

int main() {
    // First, subscribe to notifications
    subscribeNotifications();

    // Send a test notification event
    sendNotification("Test Event 1");

    return 0;
}
