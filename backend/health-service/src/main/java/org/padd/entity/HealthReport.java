package org.padd.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_report")
public class HealthReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Column(name = "start_timestamp")
    private LocalDateTime startTimestamp;

    @Column(name = "end_timestamp")
    private LocalDateTime endTimestamp;

    // Analysis of the health data to form the repoort; 
    @Column(name = "average_heart_rate")
    private double averageHeartRate;

    @Column(name = "total_sleep_duration")
    private int totalSleepDuration;

    @Column(name = "average_stress_level")
    private int averageStressLevel;

    @Column(name = "average_body_temperature")
    private double averageBodyTemperature;

    @Column(name = "max_body_temperature")
    private double maxBodyTemperature;

    @Column(name = "min_body_temperature")
    private double minBodyTemperature;

    @Column(name = "average_blood_oxygenation")
    private double averageBloodOxygenation;

    @Column(name = "max_blood_oxygenation")
    private double maxBloodOxygenation;

    @Column(name = "min_blood_oxygenation")
    private double minBloodOxygenation;


    @Column(name = "max_heart_rate")
    private double maxHeartRate;

    @Column(name = "min_heart_rate")
    private double minHeartRate;

    @Column(name = "max_stress_level")
    private int maxStressLevel;

    @Column(name = "min_stress_level")
    private int minStressLevel;

    @Column(name = "max_sleep_duration")
    private int maxSleepDuration;

    @Column(name = "min_sleep_duration")
    private int minSleepDuration;

    @Column(name = "general_state")
    private String generalState;


    /* Getters and Setters */
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getStartTimestamp() {
        return startTimestamp;
    }

    public void setStartTimestamp(LocalDateTime startTimestamp) {
        this.startTimestamp = startTimestamp;
    }

    public LocalDateTime getEndTimestamp() {
        return endTimestamp;
    }

    public void setEndTimestamp(LocalDateTime endTimestamp) {
        this.endTimestamp = endTimestamp;
    }

    public double getAverageHeartRate() {
        return averageHeartRate;
    }

    public void setAverageHeartRate(double averageHeartRate) {
        this.averageHeartRate = averageHeartRate;
    }

    public int getTotalSleepDuration() {
        return totalSleepDuration;
    }

    public void setTotalSleepDuration(int totalSleepDuration) {
        this.totalSleepDuration = totalSleepDuration;
    }

    public int getAverageStressLevel() {
        return averageStressLevel;
    }

    public void setAverageStressLevel(int averageStressLevel) {
        this.averageStressLevel = averageStressLevel;
    }

    public double getMaxHeartRate() {
        return maxHeartRate;
    }

    public void setMaxHeartRate(double maxHeartRate) {
        this.maxHeartRate = maxHeartRate;
    }

    public double getMinHeartRate() {
        return minHeartRate;
    }

    public void setMinHeartRate(double minHeartRate) {
        this.minHeartRate = minHeartRate;
    }

    public int getMaxStressLevel() {
        return maxStressLevel;
    }

    public void setMaxStressLevel(int maxStressLevel) {
        this.maxStressLevel = maxStressLevel;
    }

    public int getMinStressLevel() {
        return minStressLevel;
    }

    public void setMinStressLevel(int minStressLevel) {
        this.minStressLevel = minStressLevel;
    }

    public int getMaxSleepDuration() {
        return maxSleepDuration;
    }

    public void setMaxSleepDuration(int maxSleepDuration) {
        this.maxSleepDuration = maxSleepDuration;
    }

    public int getMinSleepDuration() {
        return minSleepDuration;
    }

    public void setMinSleepDuration(int minSleepDuration) {
        this.minSleepDuration = minSleepDuration;
    }

    public double getAverageBodyTemperature() {
        return averageBodyTemperature;
    }

    public void setAverageBodyTemperature(double averageBodyTemperature) {
        this.averageBodyTemperature = averageBodyTemperature;
    }

    public double getMaxBodyTemperature() {
        return maxBodyTemperature;
    }

    public void setMaxBodyTemperature(double maxBodyTemperature) {
        this.maxBodyTemperature = maxBodyTemperature;
    }

    public double getMinBodyTemperature() {
        return minBodyTemperature;
    }

    public void setMinBodyTemperature(double minBodyTemperature) {
        this.minBodyTemperature = minBodyTemperature;
    }

    public double getAverageBloodOxygenation() {
        return averageBloodOxygenation;
    }

    public void setAverageBloodOxygenation(double averageBloodOxygenation) {
        this.averageBloodOxygenation = averageBloodOxygenation;
    }

    public double getMaxBloodOxygenation() {
        return maxBloodOxygenation;
    }

    public void setMaxBloodOxygenation(double maxBloodOxygenation) {
        this.maxBloodOxygenation = maxBloodOxygenation;
    }

    public double getMinBloodOxygenation() {
        return minBloodOxygenation;
    }

    public void setMinBloodOxygenation(double minBloodOxygenation) {
        this.minBloodOxygenation = minBloodOxygenation;
    }




    public String getGeneralState() {
        return generalState;
    }

    public void setGeneralState(String generalState) {
        this.generalState = generalState;
    }

}
