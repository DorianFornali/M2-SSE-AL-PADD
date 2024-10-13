# M2-SSE-AL-PADDY

## Running the project

- Copy the `.env.example` file to `.env` and fill in the environment variables
- For each service that needs it, copy the `.env.example` file to `.env` and fill in the environment variables
- Run `docker compose build` to build the project
- Run `docker compose up` to start the project

## Micro services

### How to add a new micro service

- Add the service to the `docker-compose.yml` file
  - Make it depend on a database service if it needs one
- Define the environment variables in the `.env.example` and `.env` files
- Add the service to the gateway in the `backend/gateway/nginx.conf` file (to proxy the requests)


## User service

- The user service is available at `http://localhost/users/*`
  - You can check the health of the service at `http://localhost/users/health`
- You can find a documentation at `http://localhost/users/docs`

## Frontend

- The frontend is available at `http://localhost:3000`
- You can find some example users in the `backend/user-service/database/seeders/user_seeder.ts` file.

