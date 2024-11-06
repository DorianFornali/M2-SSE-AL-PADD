package com.padd.smartphone.dto;

import java.util.List;

public class HealthDataDTO {

    private List<HealthRecordDTO> healthRecords;
    private SleepPaceDTO sleepPace;

    public List<HealthRecordDTO> getHealthRecords() {
        return healthRecords;
    }

    public void setHealthRecords(List<HealthRecordDTO> healthRecords) {
        this.healthRecords = healthRecords;
    }

    public SleepPaceDTO getSleepPace() {
        return sleepPace;
    }

    public void setSleepPace(SleepPaceDTO sleepPace) {
        this.sleepPace = sleepPace;
    }

}