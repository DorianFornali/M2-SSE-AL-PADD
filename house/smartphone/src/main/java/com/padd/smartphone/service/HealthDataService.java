package com.padd.smartphone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.padd.smartphone.dto.HealthDataDTO;
import com.padd.smartphone.dto.HealthRecordDTO;
import com.padd.smartphone.dto.SleepPaceDTO;

@Service
public class HealthDataService {

    private final List<HealthRecordDTO> healthRecords = new ArrayList<>();
    private final HealthDataDTO healthData = new HealthDataDTO();

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${backend.url}")
    private String backendUrl;

    @Value("${user.email}")
    private String userEmail;
    
    public void saveHealthRecord(HealthRecordDTO healthRecordDTO) {
        checkHealthRecord(healthRecordDTO);
        healthRecords.add(healthRecordDTO);
    }

    public void saveSleepData(SleepPaceDTO sleepPaceDTO) {
        healthData.setSleepPace(sleepPaceDTO);
        sendHealthData();
    }

    private void sendHealthData() {
        healthData.setHealthRecords(healthRecords);

        String url = backendUrl + "/healthData/" + userEmail;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> request = new HttpEntity<>(healthData, headers);

        try {
            System.out.println("[SMARTPHONE] Sending health data for user : " + userEmail);
            restTemplate.postForObject(url, request, String.class);
            healthRecords.clear();
        } catch (Exception e) {
            System.out.println("[SMARTPHONE] Error while sending data: " + e.getMessage());
        }
    }

    private void checkHealthRecord(HealthRecordDTO healthRecordDTO) {
        if (healthRecordDTO.getHeartRate() > 120) {
            System.out.println("[SMARTPHONE] Heart rate is above 120");
        }
    }
}
