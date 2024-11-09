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

}
