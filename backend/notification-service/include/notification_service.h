// notification_service.h
#ifndef NOTIFICATIONS_H
#define NOTIFICATIONS_H

#include <../external/json/single_include/nlohmann/json.hpp>
namespace notification_service
{
    void notificationServiceTopicsSubscription();
    void handleMessage(const std::string& subject, const nlohmann::json& messageJson);
}



#endif
