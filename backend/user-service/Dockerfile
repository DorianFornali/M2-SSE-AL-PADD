FROM node:20.12.2-alpine3.18 AS base

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build
COPY ./.env ./build/.env

# Production stage
FROM base as production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --chown=node:node ./docker/entrypoint.sh /app/docker/entrypoint.sh
RUN chmod 777 /app/docker/entrypoint.sh
EXPOSE 3333
ENTRYPOINT ["/app/docker/entrypoint.sh"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]

# Development stage
FROM base AS development
ENV NODE_ENV=development
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
EXPOSE 3333
CMD ["node", "ace", "serve", "--hmr"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]