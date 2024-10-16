package com.padd.data.dto;

import com.padd.data.entity.HealthRecord;
import com.padd.data.entity.SleepPace;

public class HealthDataDTO {

    private HealthRecord[] healthRecords;
    private SleepPace sleepPace;

    public HealthRecord[] getHealthRecords() {
        return healthRecords;
    }

    public void setHealthRecords(HealthRecord[] healthRecords) {
        this.healthRecords = healthRecords;
    }

    public SleepPace getSleepPace() {
        return sleepPace;
    }

    public void setSleepPace(SleepPace sleepPace) {
        this.sleepPace = sleepPace;
    }

}