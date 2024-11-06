package com.padd.house.sensor.simulator.core.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.padd.house.sensor.simulator.core.implementations.FakeSensorDataRetriever;
import com.padd.house.sensor.simulator.core.records.BloodPressure;
import com.padd.house.sensor.simulator.core.records.FakeSensorData;
import com.padd.house.sensor.simulator.core.records.SleepPace;

import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class DataSenderService {

    @Value("${smartphone.url}")
    private String smartphoneUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final FakeSensorDataRetriever sensorDataRetriever = new FakeSensorDataRetriever();

    @Scheduled(fixedRate = 2L, initialDelay = 5L, timeUnit = TimeUnit.SECONDS)
    public void sendFakeSensorData() {
        String uri = "/sensor-data";

        try {
            FakeSensorData fakeSensorData = this.sensorDataRetriever.retrieveFakeSensorData().orElseThrow();
            logger.info("Sending sensor data -> {}", fakeSensorData);
            sendDataToSmartphone(fakeSensorData, uri);
        } catch (Exception e) {
            FakeSensorData fakeSensorData = FakeSensorData.builder()
                    .timestamp(LocalDateTime.now())
                    .acceleration(0)
                    .bodyTemperature(36)
                    .bloodPressure(new BloodPressure(90, 133))
                    .stressLevel(2)
                    .bloodOxygenation(99)
                    .heartRate(60)
                    .build();
            sendDataToSmartphone(fakeSensorData, uri);
        }
    }

    @Scheduled(fixedRate = 30L, initialDelay = 35L, timeUnit = TimeUnit.SECONDS)
    public void sendFakeSleepPace() {
        String uri = "/sleep-pace";

        try {
            SleepPace sleepPace = this.sensorDataRetriever.retrieveSleepPace().orElseThrow();
            logger.info("Sending sleep pace -> {}", sleepPace);
            sendDataToSmartphone(sleepPace, uri);
        } catch (Exception e) {
            SleepPace sleepPace = SleepPace.builder().paradoxSleep(20).deepSlowParadoxSleep(20).deepSlowSleep(20).lightSlowSleep(20).sleepingDuration(20).timestamp(LocalDateTime.now()).build();
            sendDataToSmartphone(sleepPace, uri);
        }
    }

    private void sendDataToSmartphone(Object data, String uri) {
        String url = smartphoneUrl + uri;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> request = new HttpEntity<>(data, headers);

        try {
            restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            logger.error("Error while sending data : {}", e.getMessage());
        }
    }
}
