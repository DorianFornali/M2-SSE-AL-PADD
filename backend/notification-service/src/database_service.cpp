//
// Created by Negruta Adrian on 22/10/2024.
//
#include "database_service.h"
#include <libpq-fe.h>
#include <iostream>
#include <cstdlib>


namespace database_service {
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
}