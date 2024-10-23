package com.padd.house.sensor.simulator.core.controllers;

import com.padd.house.sensor.simulator.core.interfaces.SensorDataRetriever;
import com.padd.house.sensor.simulator.core.records.BloodPressure;
import com.padd.house.sensor.simulator.core.records.FakeSensorData;
import com.padd.house.sensor.simulator.core.records.SleepPace;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static java.util.concurrent.TimeUnit.MINUTES;
import static java.util.concurrent.TimeUnit.SECONDS;

@Slf4j
@EnableScheduling
@Controller
public class SmartWatchWebSocket {

    private final SensorDataRetriever sensorDataRetriever;

    public SmartWatchWebSocket(SensorDataRetriever sensorDataRetriever) {
        this.sensorDataRetriever = sensorDataRetriever;
    }

    @SendTo("/topic/sensor-data")
    @Scheduled(fixedRate = 10L, initialDelay = 10L, timeUnit = SECONDS)
    public FakeSensorData sendSensorData() {
        try {
            FakeSensorData fakeSensorData = this.sensorDataRetriever.retrieveFakeSensorData().orElseThrow();
            logger.info("[WS#sendSensorData()] -> {}", fakeSensorData);
            return fakeSensorData;
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return FakeSensorData.builder()
                    .timestamp(LocalDateTime.now())
                    .acceleration(0)
                    .bodyTemperature(36)
                    .bloodPressure(new BloodPressure(90, 133))
                    .stressLevel(2)
                    .bloodOxygenation(99)
                    .heartRate(60)
                    .build();
        }
    }

    @SendTo("/topic/sleep-pace")
    @Scheduled(fixedRate = 1L, initialDelay = 1L, timeUnit = MINUTES)
    public SleepPace sleepPace() {
        try {
            SleepPace sleepPace = this.sensorDataRetriever.retrieveSleepPace().orElseThrow();
            logger.info("[WS#sleepPace()] -> {}", sleepPace);
            return sleepPace;
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return SleepPace.builder().paradoxSleep(20).deepSlowParadoxSleep(20).deepSlowSleep(20).lightSlowSleep(20).sleepingDuration(20).timestamp(LocalDateTime.now()).build();
        }
    }

}
