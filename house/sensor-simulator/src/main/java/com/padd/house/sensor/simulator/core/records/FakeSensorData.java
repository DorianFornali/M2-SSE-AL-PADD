package com.padd.house.sensor.simulator.core.records;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record FakeSensorData(
        LocalDateTime timestamp,
        BloodPressure bloodPressure,
        double heartRate,
        int stressLevel,
        double bloodOxygenation,
        double bodyTemperature,
        double acceleration
) {
}
