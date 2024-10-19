# Code structure

## Overview

The code is structured as follows:
- `backend`: contains all the backend micro services
- `frontend`: contains the frontend
- `sensor-simulator`: contains the sensor simulator
- `docs`: contains the documentation

Everything is dockerized and orchestrated using `docker-compose`.

## Backend

The backend is structured as follows:
- `gateway`: the gateway service (make services available from the outside if needed)
  - NGINX is used as a reverse proxy
- `user-service`: the user service (manages users)
  - AdonisJS is used as the backend framework
- `alert-service`: the alert service (manages alerts)
  - Quarkus is used as the backend framework
- `data-service`: the data service (receives data from the sensors and stores it)
  - Java Spring Boot is used as the backend framework
- `health-service`: the health service (apply treatments on the data)
  - Quarkus is used as the backend framework
- `notification-service`: the notification service (sends notifications to the users)
  - C++ is used as the backend language

Each service has its own folder and is dockerized.

The micro services communicate with each other using a NATS server.

There is a single database for all the services that needs it. (PostgreSQL)

## Frontend

The frontend is a React application.

It communicates with the backend services through the gateway service.