# How to contribute

## Prerequisites

- Git
- Docker
- IDE (optional)

## Installation / Running the project

See [How to run the project](./HowToRun.md)

## Adding a new feature

- Create a new branch from `main`
- Implement the feature
- Create a pull request to `main`
- Wait for the review
- Merge the pull request
- Delete the branch

## View the existing documentation

Some services have a documentation page available at `http://localhost/${service}/docs`
- For example, the user service documentation is available at `http://localhost/users/docs`

The documentation is generated using [Swagger](https://swagger.io/) and based on the OpenAPI specification.

## Adding a new micro service

- Define a new folder in the `backend` folder
- Implement the service in the new folder
- Add a Dockerfile to the service
- Add the service to the `docker-compose.yml` file
  - Make it depend on a database service if it needs one
- Define the environment variables in the `.env.example` and `.env` files
- Add the service to the gateway in the `backend/gateway/nginx.conf` file (to proxy the requests) if needed

