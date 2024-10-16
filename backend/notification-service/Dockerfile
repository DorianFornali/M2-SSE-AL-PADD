# Use an official Ubuntu image as a parent image
FROM ubuntu:20.04

# Set DEBIAN_FRONTEND to noninteractive to avoid tzdata prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    g++ \
    cmake \
    libssl-dev \
    libcurl4-openssl-dev \
    protobuf-c-compiler \
    protobuf-compiler \
    git \
    curl \
    wget \
    tzdata \
    autoconf \
    libtool \
    pkg-config \
    make \
    libprotobuf-c-dev \
    libpq-dev \
    postgresql-server-dev-all \
    postgresql-client

RUN apt-get update && apt-get install -y git
# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Copy the external libraries into the container
COPY external/json /app/external/json
COPY external/nats.c /app/external/nats.c

# Build the NATS C library
RUN cd external/nats.c \
    && rm -rf build && mkdir build && cd build \
    && cmake .. \
    && make \
    && make install

# Build the notification service
RUN rm -rf build && mkdir build && cd build && cmake .. && make

# Expose the port for NATS
EXPOSE 8086

# Run the notification service
CMD ["./bin/notification_service"]