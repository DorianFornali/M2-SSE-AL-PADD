package com.padd.data.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.padd.data.entity.BloodPressure;
import com.padd.data.entity.HealthRecord;
import com.padd.data.entity.SleepPace;
import com.padd.data.entity.User;
import com.padd.data.repository.UserRepository;
import com.padd.data.service.HealthDataService;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
public class SeedingController {

    private final HealthDataService healthDataService;
    private final UserRepository userRepository;

    public SeedingController(
        HealthDataService healthDataService,
        UserRepository userRepository
    ) {
        this.healthDataService = healthDataService;
        this.userRepository = userRepository;
    }
    
    @GetMapping("/seed/{userId}")
    public ResponseEntity<String> saveHealthData(@PathVariable String userId) {
        if (createFakeData(userId)) {
            return new ResponseEntity<>("Fake data created for user : " + userId, HttpStatus.OK);
        }
        return new ResponseEntity<>("Failed to create fake data for user : " + userId, HttpStatus.NOT_FOUND);
    }

    private boolean createFakeData(String userId) {
        Optional<User> user = userRepository.findById(Long.parseLong(userId));

        if (!user.isPresent()) {
            return false;
        }

        for (int i = 0; i < 12; i++) {
            for (int j = 0; j < 28; j++) {
                HealthRecord healthRecord = new HealthRecord();
                healthRecord.setUser(user.get());

                int day = j + 1;
                int month = i + 1;
                
                LocalDateTime timestamp = LocalDateTime.of(2024, month, day, 0, 0, 0);
                healthRecord.setTimestamp(timestamp);
                
                BloodPressure bloodPressure = new BloodPressure();
                bloodPressure.setSystolic(120 + i);
                bloodPressure.setDiastolic(80 + i);
                healthRecord.setBloodPressure(bloodPressure);

                healthRecord.setHeartRate(80 + i);
                healthRecord.setStressLevel(2 + i);
                healthRecord.setBloodOxygenation(98 + i);
                healthRecord.setBodyTemperature(36.5 + i);
                healthRecord.setAcceleration(10 + i);

                healthDataService.createOrUpdateHealthRecord(healthRecord);

                SleepPace sleepPace = new SleepPace();
                sleepPace.setUser(user.get());

                sleepPace.setTimestamp(timestamp);

                sleepPace.setSleepDuration(7);
                sleepPace.setLightSlowSleep(4);
                sleepPace.setDeepSlowSleep(1);
                sleepPace.setDeepSlowParadoxSleep(1);
                sleepPace.setParadoxSleep(1);

                healthDataService.createOrUpdateSleepPace(sleepPace);
            }
        }

        return true;
    }

}
