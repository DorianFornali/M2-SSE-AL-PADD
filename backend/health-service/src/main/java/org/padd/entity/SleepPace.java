package org.padd.entity;

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

    @Column(name = "sleep_duration")
    private double sleepDuration;

    @Column(name = "light_slow_sleep")
    private double lightSlowSleep;

    @Column(name = "deep_slow_sleep")
    private double deepSlowSleep;

    @Column(name = "deep_slow_paradox_sleep")
    private double deepSlowParadoxSleep;

    @Column(name = "paradox_sleep")
    private double paradoxSleep;

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

    public double getSleepDuration() {
        return sleepDuration;
    }

    public void setSleepDuration(double sleepDuration) {
        this.sleepDuration = sleepDuration;
    }

    public double getLightSlowSleep() {
        return lightSlowSleep;
    }

    public void setLightSlowSleep(double lightSlowSleep) {
        this.lightSlowSleep = lightSlowSleep;
    }

    public double getDeepSlowSleep() {
        return deepSlowSleep;
    }

    public void setDeepSlowSleep(double deepSlowSleep) {
        this.deepSlowSleep = deepSlowSleep;
    }

    public double getDeepSlowParadoxSleep() {
        return deepSlowParadoxSleep;
    }

    public void setDeepSlowParadoxSleep(double deepSlowParadoxSleep) {
        this.deepSlowParadoxSleep = deepSlowParadoxSleep;
    }

    public double getParadoxSleep() {
        return paradoxSleep;
    }

    public void setParadoxSleep(double paradoxSleep) {
        this.paradoxSleep = paradoxSleep;
    }

}
