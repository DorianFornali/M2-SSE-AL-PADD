# How to run the project

## Prerequisites
- Git
- Docker
- IDE (optional)

## Installation

- Clone the repository
- Run the following to copy all the `.env.example` files to `.env` files:

```bash
cp .env.example .env
cp backend/user-service/.env.example backend/user-service/.env
cp frontend/.env.example frontend/.env
```

- Modify the `.env` files to your liking (change production mode to development for example)
- Run the following to build the project:

```bash
docker compose build
```

## Running the project

- Run the following to start the project:

```bash
docker compose up
```

- The frontend will be available at `http://localhost:3000`
- All the accessible services are proxied through the gateway service, so you can access them through `http://localhost`
  - User service: `http://localhost/users`
  - Alert service : `http://localhost/alert`
  - Data service : `http://localhost/data`

### Checking the health of the services

You can check the health of the services by going to the `/health` endpoint of the service, for example : 
- User service: `http://localhost/users/health`

## Stopping the project

- Run the following to stop the project:

```bash
docker compose down
```
