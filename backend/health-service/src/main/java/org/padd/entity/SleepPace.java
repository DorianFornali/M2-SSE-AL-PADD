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
    private int sleepDuration;

    @Column(name = "light_slow_sleep")
    private int lightSlowSleep;

    @Column(name = "deep_slow_sleep")
    private int deepSlowSleep;

    @Column(name = "deep_slow_paradox_sleep")
    private int deepSlowParadoxSleep;

    @Column(name = "paradox_sleep")
    private int paradoxSleep;

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

    public int getSleepDuration() {
        return sleepDuration;
    }

    public void setSleepDuration(int sleepDuration) {
        this.sleepDuration = sleepDuration;
    }

    public int getLightSlowSleep() {
        return lightSlowSleep;
    }

    public void setLightSlowSleep(int lightSlowSleep) {
        this.lightSlowSleep = lightSlowSleep;
    }

    public int getDeepSlowSleep() {
        return deepSlowSleep;
    }

    public void setDeepSlowSleep(int deepSlowSleep) {
        this.deepSlowSleep = deepSlowSleep;
    }

    public int getDeepSlowParadoxSleep() {
        return deepSlowParadoxSleep;
    }

    public void setDeepSlowParadoxSleep(int deepSlowParadoxSleep) {
        this.deepSlowParadoxSleep = deepSlowParadoxSleep;
    }

    public int getParadoxSleep() {
        return paradoxSleep;
    }

    public void setParadoxSleep(int paradoxSleep) {
        this.paradoxSleep = paradoxSleep;
    }

}
