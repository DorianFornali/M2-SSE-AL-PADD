#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  node ace serve --hmr
fi

if [ "$NODE_ENV" = "production" ]; then
  # ---
  cd /app/build

  # ---
  echo "Running the migrations..."
  node ace migration:run --force
  echo "Migrations ran"

  # ---
  echo "Running the seeders..."
  node ace db:seed
  echo "Seeders ran"

  # ---
  echo "Starting the app..."
  node ./bin/server.js
fi


