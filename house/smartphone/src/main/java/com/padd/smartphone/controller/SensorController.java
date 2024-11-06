package com.padd.smartphone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.padd.smartphone.dto.HealthRecordDTO;
import com.padd.smartphone.dto.SleepPaceDTO;
import com.padd.smartphone.service.HealthDataService;

@RestController
public class SensorController {

    private final HealthDataService healthDataService;

    @Autowired
    public SensorController(HealthDataService healthDataService) {
        this.healthDataService = healthDataService;
    }
    
    @PostMapping("/sensor-data")
    public void receiveSensorData(@RequestBody HealthRecordDTO healthRecordDTO) {
        System.out.println("[SMARTPHONE] Received sensor data");
        healthDataService.saveHealthRecord(healthRecordDTO);
    }

    @PostMapping("/sleep-pace")
    public void receiveSleepPace(@RequestBody SleepPaceDTO sleepPaceDTO) {
        System.out.println("[SMARTPHONE] Received sleep pace");
        healthDataService.saveSleepData(sleepPaceDTO);
    }

}
