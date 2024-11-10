//
// Created by Negruta Adrian on 22/10/2024.
//
#include "database_service.h"
#include <tuple>
#include <libpq-fe.h>
#include <iostream>
#include <cstdlib>


namespace database_service {



std::tuple<std::string, std::string, std::vector<std::string>> getToContactEmailsFromDatabase(const std::string& id) {
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

    // Query to get the patient's name
    std::string patientQuery =
        "SELECT first_name, last_name "
        "FROM users "
        "WHERE id = '" + id + "'";

    PGresult* patientRes = PQexec(conn, patientQuery.c_str());
    std::string firstName, lastName;

    if (PQresultStatus(patientRes) == PGRES_TUPLES_OK && PQntuples(patientRes) > 0) {
        firstName = PQgetvalue(patientRes, 0, 0);
        lastName = PQgetvalue(patientRes, 0, 1);
    } else {
        std::cerr << "Patient data not retrieved: " << PQerrorMessage(conn) << std::endl;
        PQclear(patientRes);
        PQfinish(conn);
        return {};
    }
    PQclear(patientRes);

    // Query to get emails of nurse and doctor
    std::string contactsQuery =
        "SELECT u.email "
        "FROM users u "
        "JOIN user_relations ur ON u.id = ur.related_user_id "
        "WHERE ur.user_id = '" + id + "' "
        "AND ur.relation_type IN ('NURSE', 'DOCTOR')";

    PGresult* contactsRes = PQexec(conn, contactsQuery.c_str());
    std::vector<std::string> emails;

    if (PQresultStatus(contactsRes) == PGRES_TUPLES_OK) {
        for (int i = 0; i < PQntuples(contactsRes); i++) {
            emails.push_back(PQgetvalue(contactsRes, i, 0));
        }
    } else {
        std::cerr << "Contacts data not retrieved: " << PQerrorMessage(conn) << std::endl;
    }

    PQclear(contactsRes);
    PQfinish(conn);

    return std::make_tuple(firstName, lastName, emails);
}
}