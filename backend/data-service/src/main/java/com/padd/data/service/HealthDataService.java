package com.padd.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import io.nats.client.Connection;
import io.nats.client.Nats;

import com.padd.data.dto.HealthDataDTO;
import com.padd.data.entity.HealthRecord;
import com.padd.data.entity.SleepPace;
import com.padd.data.entity.User;
import com.padd.data.repository.SleepPaceRepository;
import com.padd.data.repository.UserRepository;
import com.padd.data.repository.HealthRecordRepository;

@Service
public class HealthDataService {
    
    private final SleepPaceRepository sleepPaceRepository;
    private final HealthRecordRepository healthRecordRepository;
    private final UserRepository userRepository;
    private Connection connect;

    @Autowired
    public HealthDataService(
        SleepPaceRepository sleepPaceRepository,
        HealthRecordRepository healthRecordRepository,
        UserRepository userRepository
    ) {
        this.sleepPaceRepository = sleepPaceRepository;
        this.healthRecordRepository = healthRecordRepository;
        this.userRepository = userRepository;

        connectToNats();
    }

    private void connectToNats() {
        try {
            connect = Nats.connect("nats://nats:4222");
            System.out.println("[DATA-SERVICE] connected to NATS");
        }
        catch (Exception e) {
            System.out.println("[DATA-SERVICE] Error while connecting to NATS : " + e.getMessage());
        }
    }

    public void saveHealthData(HealthDataDTO healthDataDTO, String userId) {
        SleepPace sleepPace = healthDataDTO.getSleepPace();

        Optional<User> user = userRepository.findById(Long.parseLong(userId));
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }

        sleepPace.setUser(user.get());
        createOrUpdateSleepPace(sleepPace);

        for (HealthRecord healthRecord : healthDataDTO.getHealthRecords()) {
            healthRecord.setUser(user.get());
            createOrUpdateHealthRecord(healthRecord);
        }

        HealthRecord[] healthRecords = healthDataDTO.getHealthRecords();

        // no analysis for less than 2 records
        if (healthRecords.length <= 1)
            return;

        triggerHealthDataAnalysis(
            user.get().getId(), 
            healthRecords[0].getTimestamp(),
            healthRecords[healthRecords.length - 1].getTimestamp()
        );
    }

    private void triggerHealthDataAnalysis(Integer userId, LocalDateTime startTimestamp, LocalDateTime endTimestamp) {
        try {
            String topic = "triggerDataAnalysis." + Integer.toString(userId);
            String jsonMessage = "{\"start\":\"" + startTimestamp.toString() + "\",\"end\":\"" + endTimestamp.toString() + "\"}";
            connect.publish(topic, jsonMessage.getBytes());
            System.out.println("[DATA-SERVICE] Published to NATS on topic : " + topic);
        }
        catch (Exception e) {
            System.out.println("[DATA-SERVICE] Error while publishing message : " + e.getMessage());
        }
    }

    public void createOrUpdateHealthRecord(HealthRecord healthRecord) {
        Optional<HealthRecord> existingHealthRecord = healthRecordRepository.findByUserAndTimestamp(healthRecord.getUser(), healthRecord.getTimestamp());

        if (!existingHealthRecord.isPresent()) {
            healthRecordRepository.save(healthRecord);
        }
    }

    public void createOrUpdateSleepPace(SleepPace sleepPace) {
        Optional<SleepPace> existingSleepPace = sleepPaceRepository.findByUserAndTimestamp(sleepPace.getUser(), sleepPace.getTimestamp());

        if (!existingSleepPace.isPresent()) {
            sleepPaceRepository.save(sleepPace);
        }
    }
    
}
