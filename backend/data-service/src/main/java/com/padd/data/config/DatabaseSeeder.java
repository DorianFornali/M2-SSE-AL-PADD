package com.padd.data.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

import com.padd.data.entity.BloodPressure;
import com.padd.data.entity.HealthRecord;
import com.padd.data.entity.SleepPace;
import com.padd.data.entity.User;
import com.padd.data.repository.UserRepository;
import com.padd.data.service.HealthDataService;

import java.time.LocalDateTime;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    
    private final HealthDataService healthDataService;
    private final UserRepository userRepository;

    @Autowired
    public DatabaseSeeder(
        HealthDataService healthDataService,
        UserRepository userRepository
    ) {
        this.healthDataService = healthDataService;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // User 7
        Long user1Id = 7L;
        User user1 = userRepository.findById(user1Id)
            .orElseThrow(() -> new RuntimeException(String.format("User %d not found", user1Id)));

        for (int i = 0; i < 10; i++) {
            HealthRecord healthRecord = new HealthRecord();
            healthRecord.setUser(user1);
            
            LocalDateTime timestamp = LocalDateTime.of(2024, 1, 1, 0, i, 0);
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
        }

        SleepPace sleepPace1 = new SleepPace();
        sleepPace1.setUser(user1);

        LocalDateTime timestamp1 = LocalDateTime.of(2024, 1, 1, 0, 1, 0);
        sleepPace1.setTimestamp(timestamp1);

        sleepPace1.setSleepDuration(7);
        sleepPace1.setLightSlowSleep(4);
        sleepPace1.setDeepSlowSleep(1);
        sleepPace1.setDeepSlowParadoxSleep(1);
        sleepPace1.setParadoxSleep(1);

        healthDataService.createOrUpdateSleepPace(sleepPace1);

        // User 8
        Long user2Id = 8L;
        User user2 = userRepository.findById(user2Id)
            .orElseThrow(() -> new RuntimeException(String.format("User %d not found", user2Id)));

        for (int i = 0; i < 10; i++) {
            HealthRecord healthRecord = new HealthRecord();
            healthRecord.setUser(user2);
            
            LocalDateTime timestamp = LocalDateTime.of(2024, 1, 1, 0, i, 0);
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
        }

        SleepPace sleepPace2 = new SleepPace();
        sleepPace2.setUser(user2);

        LocalDateTime timestamp2 = LocalDateTime.of(2024, 1, 1, 0, 1, 0);
        sleepPace2.setTimestamp(timestamp2);

        sleepPace2.setSleepDuration(7);
        sleepPace2.setLightSlowSleep(4);
        sleepPace2.setDeepSlowSleep(1);
        sleepPace2.setDeepSlowParadoxSleep(1);
        sleepPace2.setParadoxSleep(1);

        healthDataService.createOrUpdateSleepPace(sleepPace2);
    }

}
