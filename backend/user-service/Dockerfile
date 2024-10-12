FROM node:20.12.2-alpine3.18 AS base

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci
ADD . .
RUN node ace build
COPY ./.env ./build/.env
COPY --chown=node:node ./docker/entrypoint.sh /app/docker/entrypoint.sh
RUN chmod 777 /app/docker/entrypoint.sh
EXPOSE 3333
ENTRYPOINT ["/app/docker/entrypoint.sh"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]
