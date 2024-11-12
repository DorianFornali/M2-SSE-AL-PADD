package com.padd.smartphone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.padd.smartphone.dto.AlertDTO;
import com.padd.smartphone.dto.HealthDataDTO;
import com.padd.smartphone.dto.HealthRecordDTO;
import com.padd.smartphone.dto.SleepPaceDTO;

@Service
public class HealthDataService {

    private final Integer HEALTH_RECORDS_BATCH_SIZE = 24;
    private List<HealthRecordDTO> healthRecords = new ArrayList<>();

    private final HealthDataDTO healthData = new HealthDataDTO();

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${dataService.url}")
    private String dataServiceUrl;

    @Value("${alertService.url}")
    private String alertServiceUrl;

    @Value("${user.id}")
    private String userId;
    
    public void saveHealthRecord(HealthRecordDTO healthRecordDTO) {
        checkHealthRecord(healthRecordDTO);

        healthRecords.add(healthRecordDTO);
        
        if (healthRecords.size() == HEALTH_RECORDS_BATCH_SIZE) {
            healthData.setHealthRecords(new ArrayList<>(healthRecords));
            healthRecords.clear();
        }
    }

    public void saveSleepData(SleepPaceDTO sleepPaceDTO) {
        healthData.setSleepPace(sleepPaceDTO);    
        sendHealthData();
    }

    private void sendHealthData() {
        String url = dataServiceUrl + "/healthData/" + userId;
        sendPostRequest(url, healthData);
    }

    private void sendPostRequest(String url, Object dto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> request = new HttpEntity<>(dto, headers);

        try {
            System.out.println("[SMARTPHONE] Sending request to : " + url);
            restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            System.out.println("[SMARTPHONE] Error while sending request to : " + url + ", " + e.getMessage());
        }
    }

    private void checkHealthRecord(HealthRecordDTO healthRecordDTO) {
        String url = alertServiceUrl + "/alert";

        // Heart rate
        if (healthRecordDTO.getHeartRate() > 100) {
            AlertDTO alert = new AlertDTO();
            alert.setId(userId);
            alert.setDatatype("heart rate");
            alert.setValue(Double.toString(healthRecordDTO.getHeartRate()));
            alert.setTimestamp(healthRecordDTO.getTimestamp().toString());
            
            System.out.println("[SMARTPHONE] Alert! Heart rate is too high : " + alert.getValue());
            sendPostRequest(url, alert);
        }
    }
}
