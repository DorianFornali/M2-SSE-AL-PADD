#!/bin/sh

# Go into build
cd /usr/src/app/build

# Run the migrations
echo "Running the migrations..."
node ace migration:run --force
echo "Migrations ran"

# Start the app
echo "Starting the app..."
node ./bin/server.js

