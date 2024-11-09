package com.padd.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import io.nats.client.Connection;
import io.nats.client.Nats;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.padd.data.dto.HealthDataAnalysisDTO;
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
    private final ObjectMapper objectMapper;

    @Autowired
    public HealthDataService(
        SleepPaceRepository sleepPaceRepository,
        HealthRecordRepository healthRecordRepository,
        UserRepository userRepository
    ) {
        this.sleepPaceRepository = sleepPaceRepository;
        this.healthRecordRepository = healthRecordRepository;
        this.userRepository = userRepository;

        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

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

        HealthDataAnalysisDTO timestamps = new HealthDataAnalysisDTO();
        HealthRecord[] healthRecords = healthDataDTO.getHealthRecords();

        // no analysis for less than 2 records
        if (healthRecords.length <= 1)
            return;
        
        timestamps.setStart(healthRecords[0].getTimestamp());
        timestamps.setEnd(healthRecords[healthRecords.length - 1].getTimestamp());

        triggerHealthDataAnalysis(user.get().getId(), timestamps);
    }

    private void triggerHealthDataAnalysis(Integer userId, HealthDataAnalysisDTO timestamps) {
        try {
            String topic = "triggerDataAnalysis." + Integer.toString(userId);
            String jsonMessage = objectMapper.writeValueAsString(timestamps);
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
