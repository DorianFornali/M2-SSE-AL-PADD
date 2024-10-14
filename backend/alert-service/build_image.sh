#!/bin/bash

APP="${PWD##*/}"

# Building docker image
./mvnw package -DskipTests
echo "Begin: Building docker image alert-service/$APP"
docker build -f src/main/docker/Dockerfile.jvm -t "alert-service" .
echo "Done: Building docker image alert-service/$APP"
