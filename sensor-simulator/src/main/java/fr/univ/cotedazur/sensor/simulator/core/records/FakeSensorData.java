package fr.univ.cotedazur.sensor.simulator.core.records;

import lombok.Builder;

@Builder
public record FakeSensorData(
        int heartRate,
        int stressLevel,
        double bloodOxygenation,
        int bodyTemperature
) {
}
