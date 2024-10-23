package com.padd.house.sensor.simulator.core.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class SmartWatchWebSocket {

    public SmartWatchWebSocket() {
    }

    @MessageMapping("/sensor-data")
    public String sendSensorData() {
        logger.info("Client listening to /topic/sensor-data");
        return "[WSBroker] Listening to /topic/sensor-data";
    }

    @MessageMapping("/sleep-pace")
    public String sleepPace() {
        logger.info("Client listening to /topic/sleep-pace");
        return "[WSBroker] Listening to /topic/sleep-pace";
    }

}
