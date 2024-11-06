package com.padd.house.sensor.simulator.core.records;

import lombok.Builder;

@Builder
public record BloodPressure(int diastolic, int systolic) {
}
