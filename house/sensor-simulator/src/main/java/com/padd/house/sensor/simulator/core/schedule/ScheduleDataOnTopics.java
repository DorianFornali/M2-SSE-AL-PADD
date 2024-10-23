package com.padd.house.sensor.simulator.core.schedule;

import com.padd.house.sensor.simulator.core.interfaces.SensorDataRetriever;
import com.padd.house.sensor.simulator.core.records.BloodPressure;
import com.padd.house.sensor.simulator.core.records.FakeSensorData;
import com.padd.house.sensor.simulator.core.records.SleepPace;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class ScheduleDataOnTopics {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final SensorDataRetriever sensorDataRetriever;

    public ScheduleDataOnTopics(SimpMessagingTemplate simpMessagingTemplate, SensorDataRetriever sensorDataRetriever) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.sensorDataRetriever = sensorDataRetriever;
    }

    @Scheduled(fixedRate = 10L, initialDelay = 10L, timeUnit = TimeUnit.SECONDS)
    public void sendSensorDataOnTopic() {
        try {
            FakeSensorData fakeSensorData = this.sensorDataRetriever.retrieveFakeSensorData().orElseThrow();
            logger.info("[WS#sendSensorData()] -> {}", fakeSensorData);
            this.simpMessagingTemplate.convertAndSend("/topic/sensor-data", fakeSensorData);
        } catch (Exception e) {
            this.simpMessagingTemplate.convertAndSend("/topic/sensor-data", FakeSensorData.builder()
                    .timestamp(LocalDateTime.now())
                    .acceleration(0)
                    .bodyTemperature(36)
                    .bloodPressure(new BloodPressure(90, 133))
                    .stressLevel(2)
                    .bloodOxygenation(99)
                    .heartRate(60)
                    .build());
        }
    }

    @Scheduled(fixedRate = 1L, initialDelay = 1L, timeUnit = TimeUnit.MINUTES)
    public void sendSleepPace() {
        try {
            SleepPace sleepPace = this.sensorDataRetriever.retrieveSleepPace().orElseThrow();
            logger.info("[WS#sleepPace()] -> {}", sleepPace);
            this.simpMessagingTemplate.convertAndSend("/topic/sleep-pace", sleepPace);
        } catch (Exception e) {
            this.simpMessagingTemplate.convertAndSend("/topic/sleep-pace", SleepPace.builder().paradoxSleep(20).deepSlowParadoxSleep(20).deepSlowSleep(20).lightSlowSleep(20).sleepingDuration(20).timestamp(LocalDateTime.now()).build());
        }
    }

}
