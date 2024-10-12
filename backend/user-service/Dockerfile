FROM node:20.12.2-alpine3.18 AS base

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --only=production

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
COPY ./.env.production ./build/.env
RUN node ace build

# Production stage
FROM base as production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY ./docker/entrypoint.sh /app/docker/entrypoint.sh
EXPOSE 3333
RUN chmod +x /app/docker/entrypoint.sh
ENTRYPOINT ["/app/docker/entrypoint.sh"]

# Development stage
FROM base AS development
ENV NODE_ENV=development
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
EXPOSE 3333
CMD ["node", "ace", "serve", "--hmr"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]