package com.padd.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.padd.data.dto.HealthDataDTO;
import com.padd.data.entity.HealthRecord;
import com.padd.data.entity.SleepPace;
import com.padd.data.repository.SleepPaceRepository;
import com.padd.data.repository.HealthRecordRepository;

@Service
public class HealthDataService {
    
    private final SleepPaceRepository sleepPaceRepository;
    private final HealthRecordRepository healthRecordRepository;

    @Autowired
    public HealthDataService(
        SleepPaceRepository sleepPaceRepository,
        HealthRecordRepository healthRecordRepository
    ) {
        this.sleepPaceRepository = sleepPaceRepository;
        this.healthRecordRepository = healthRecordRepository;
    }

    public void saveHealthData(HealthDataDTO healthDataDTO, String userId) {
        SleepPace sleepPace = healthDataDTO.getSleepPace();
        sleepPace.setUserId(userId);
        sleepPaceRepository.save(healthDataDTO.getSleepPace());

        for (HealthRecord healthRecord : healthDataDTO.getHealthRecords()) {
            healthRecord.setUserId(userId);
            healthRecordRepository.save(healthRecord);
        }
    }
    
}
