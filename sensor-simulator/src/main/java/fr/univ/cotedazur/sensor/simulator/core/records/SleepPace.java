package fr.univ.cotedazur.sensor.simulator.core.records;

import java.util.concurrent.TimeUnit;

/**
 * A Record that represents the sleep phases,
 * separate all together into 5 field that is represented
 * by an {@link Integer} which is the time in {@link TimeUnit#MINUTES}
 */
public record SleepPace(int sleepingDuration,
                        int lightSlowSleep,
                        int deepSlowSleep,
                        int deepSlowParadoxSleep,
                        int paradoxSleep) {
}
