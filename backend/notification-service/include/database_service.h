#ifndef DATABASE_SERVICE_HPP
#define DATABASE_SERVICE_HPP

#include <string>
#include <vector>

namespace database_service
{
    /* Retrieve the contacts for whom the message needs to be forwarded */
    std::tuple<std::string, std::string, std::vector<std::string>> getToContactEmailsFromDatabase(const std::string& id);
}
#endif // DATABASE_SERVICE_HPP
