package com.padd.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

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

    @Autowired
    public HealthDataService(
        SleepPaceRepository sleepPaceRepository,
        HealthRecordRepository healthRecordRepository,
        UserRepository userRepository
    ) {
        this.sleepPaceRepository = sleepPaceRepository;
        this.healthRecordRepository = healthRecordRepository;
        this.userRepository = userRepository;
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
