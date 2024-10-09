# Use an official Ubuntu image as a parent image
FROM ubuntu:20.04

# Set DEBIAN_FRONTEND to noninteractive to avoid tzdata prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    g++ \
    cmake \
    libssl-dev \
    protobuf-c-compiler \
    protobuf-compiler \
    git \
    curl \
    wget \
    tzdata

# Install Protobuf-C library
RUN apt-get install -y libprotobuf-c-dev

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Ensure NATS library is built and linked
RUN rm -rf external/nats.c/build && mkdir -p external/nats.c/build && cd external/nats.c/build && cmake .. && make

# Build the notification service
RUN rm -rf build && mkdir build && cd build && cmake .. && make

# Expose the port for NATS
EXPOSE 4222

# Run the notification service
CMD ["./bin/notification_service"]
