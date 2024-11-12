package com.padd.data.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "sleep_pace")
public class SleepPace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "timestamp", columnDefinition = "TIMESTAMP")
    private LocalDateTime timestamp;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private Double sleepDuration;
    private Double lightSlowSleep;
    private Double deepSlowSleep;
    private Double deepSlowParadoxSleep;
    private Double paradoxSleep;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getSleepDuration() {
        return sleepDuration;
    }

    public void setSleepDuration(Double sleepDuration) {
        System.out.println("setting sleep duration : " + sleepDuration);
        this.sleepDuration = sleepDuration;
    }

    public Double getLightSlowSleep() {
        return lightSlowSleep;
    }

    public void setLightSlowSleep(Double lightSlowSleep) {
        this.lightSlowSleep = lightSlowSleep;
    }

    public Double getDeepSlowSleep() {
        return deepSlowSleep;
    }

    public void setDeepSlowSleep(Double deepSlowSleep) {
        this.deepSlowSleep = deepSlowSleep;
    }

    public Double getDeepSlowParadoxSleep() {
        return deepSlowParadoxSleep;
    }

    public void setDeepSlowParadoxSleep(Double deepSlowParadoxSleep) {
        this.deepSlowParadoxSleep = deepSlowParadoxSleep;
    }

    public Double getParadoxSleep() {
        return paradoxSleep;
    }

    public void setParadoxSleep(Double paradoxSleep) {
        this.paradoxSleep = paradoxSleep;
    }
    
}
