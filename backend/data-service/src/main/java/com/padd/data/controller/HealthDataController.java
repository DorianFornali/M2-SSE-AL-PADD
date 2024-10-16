package com.padd.data.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.padd.data.dto.HealthDataDTO;
import com.padd.data.service.HealthDataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/healthData")
public class HealthDataController {

    private final HealthDataService healthDataService;

    @Autowired
    public HealthDataController(HealthDataService healthDataService) {
        this.healthDataService = healthDataService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<String> saveHealthData(
        @PathVariable String userId, 
        @RequestBody HealthDataDTO healthData
    ) {
        healthDataService.saveHealthData(healthData);
        return new ResponseEntity<>("Health data saved for user: " + userId, HttpStatus.OK);
    }

}
