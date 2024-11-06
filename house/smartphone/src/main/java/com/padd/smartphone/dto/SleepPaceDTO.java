package com.padd.smartphone.dto;

import java.time.LocalDateTime;

public class SleepPaceDTO {

    private LocalDateTime timestamp;

    private double sleepDuration;
    private double lightSlowSleep;
    private double deepSlowSleep;
    private double deepSlowParadoxSleep;
    private double paradoxSleep;

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
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
