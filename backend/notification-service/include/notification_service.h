// notification_service.h
#ifndef NOTIFICATIONS_H
#define NOTIFICATIONS_H


#include <string>
#include <iostream>
#include <nats.h>  // Use the correct path for nats.h


void sendNotification(const std::string& event);
void subscribeNotifications();


#endif
