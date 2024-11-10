package com.padd.house.sensor.simulator.core.interfaces;

import com.padd.house.sensor.simulator.core.records.BloodPressure;
import com.padd.house.sensor.simulator.core.records.FakeSensorData;
import com.padd.house.sensor.simulator.core.records.SleepPace;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

public interface SensorDataRetriever {

    Optional<FakeSensorData> retrieveFakeSensorData(int index, LocalDateTime initialDateTime);

    Optional<BloodPressure> retrieveBloodPressure();

    Optional<SleepPace> retrieveSleepPace(int index, LocalDateTime initialDateTime);

}
