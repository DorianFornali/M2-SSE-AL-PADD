# Use a base image with C++ and required tools
FROM ubuntu:20.04

# Install build tools and dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    libssl-dev

# Clone and build NATS C++ client
RUN git clone https://github.com/nats-io/nats.c.git /nats.c && \
    cd /nats.c && \
    mkdir build && \
    cd build && \
    cmake .. && \
    make && \
    make install

# Copy the microservice code
COPY . /my-microservice
WORKDIR /my-microservice

# Build the microservice
RUN mkdir build && cd build && cmake .. && make

# Set the entry point to run the microservice
CMD ["./build/notification_service"]
