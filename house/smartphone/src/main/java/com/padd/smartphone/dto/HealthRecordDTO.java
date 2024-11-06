package com.padd.smartphone.dto;

import java.time.LocalDateTime;

public class HealthRecordDTO {

    private LocalDateTime timestamp;
    private BloodPressureDTO bloodPressure;

    private double heartRate;
    private int stressLevel;
    private double bloodOxygenation;
    private double bodyTemperature;
    private double acceleration;

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public BloodPressureDTO getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(BloodPressureDTO bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public double getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(double heartRate) {
        this.heartRate = heartRate;
    }

    public int getStressLevel() {
        return stressLevel;
    }

    public void setStressLevel(int stressLevel) {
        this.stressLevel = stressLevel;
    }

    public double getBloodOxygenation() {
        return bloodOxygenation;
    }

    public void setBloodOxygenation(double bloodOxygenation) {
        this.bloodOxygenation = bloodOxygenation;
    }

    public double getBodyTemperature() {
        return bodyTemperature;
    }

    public void setBodyTemperature(double bodyTemperature) {
        this.bodyTemperature = bodyTemperature;
    }

    public double getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(double acceleration) {
        this.acceleration = acceleration;
    }

}
