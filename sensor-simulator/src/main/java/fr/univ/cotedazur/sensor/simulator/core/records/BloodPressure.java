package fr.univ.cotedazur.sensor.simulator.core.records;

import lombok.Builder;

@Builder
public record BloodPressure(int diastolic, int systolic) {
}
