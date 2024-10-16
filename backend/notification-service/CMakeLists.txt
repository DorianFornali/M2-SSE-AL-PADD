cmake_minimum_required(VERSION 3.10)
project(NotificationService)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
find_package(OpenSSL REQUIRED)
find_package(CURL REQUIRED)
find_package(PostgreSQL REQUIRED)

if (NOT PostgreSQL_FOUND)
    set(PostgreSQL_INCLUDE_DIR "/opt/homebrew/include")
    set(PostgreSQL_LIBRARY "/opt/homebrew/lib/libpq.dylib")
endif()


include_directories(${CMAKE_SOURCE_DIR}/external/nats.c/src)
include_directories(${CMAKE_SOURCE_DIR}/include)
include_directories(${CMAKE_SOURCE_DIR}/external/json/single_include/nlohmann)  # Path to the json.hpp header
include_directories(/opt/homebrew/opt/protobuf-c/include)
include_directories(${PostgreSQL_INCLUDE_DIRS})


link_directories(/opt/homebrew/opt/protobuf-c/lib)

include_directories(${CURL_INCLUDE_DIRS})


set(SOURCE_FILES
        src/main.cpp
        src/notification_service.cpp
)
add_executable(notification_service ${SOURCE_FILES})
target_link_libraries(notification_service PRIVATE
        ${CMAKE_SOURCE_DIR}/external/nats.c/build/lib/libnats_static.a
        ${CURL_LIBRARIES}
        ${PostgreSQL_LIBRARIES}
        OpenSSL::SSL
        OpenSSL::Crypto
        protobuf-c
        pthread  # Explicitly link the pthread library
)
set_target_properties(notification_service PROPERTIES
        RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin
)
