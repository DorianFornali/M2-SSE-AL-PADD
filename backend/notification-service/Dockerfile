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
    tzdata \
    autoconf \
    libtool \
    pkg-config \
    make

# Install Protobuf-C library
RUN apt-get install -y libprotobuf-c-dev

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN git clone https://github.com/nlohmann/json.git external/nlohmann

# Clone and build the NATS C library using Autotools
RUN git clone https://github.com/nats-io/nats.c.git external/nats.c \
    && cd external/nats.c \
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
