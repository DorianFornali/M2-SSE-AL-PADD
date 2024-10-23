#ifndef EMAIL_SERVICE_HPP
#define EMAIL_SERVICE_HPP

#include <string>
#include <vector>
#include <../external/json/single_include/nlohmann/json.hpp>

namespace email_service
{
    std::string formPayloadForEmail(const std::vector<std::string>& ToList, const std::string& From, const std::string& topic);
    void sendEmail(const std::vector<std::string>& emailList, const std::string& subject, const nlohmann::json& received_message_data);
}
#endif // EMAIL_SERVICE_HPP
