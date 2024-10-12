# M2-SSE-AL-PADDY

## Micro services

### How to add a new micro service

- Add the service to the `docker-compose.yml` file
  - Make it depend on a database service if it needs one
- Define the environment variables in the `.env.example` and `.env` files
- Add the service to the gateway in the `backend/gateway/nginx.conf` file (to proxy the requests)

