package com.padd.house.sensor.simulator.core.interfaces;

import com.padd.house.sensor.simulator.core.records.BloodPressure;
import com.padd.house.sensor.simulator.core.records.FakeSensorData;
import com.padd.house.sensor.simulator.core.records.SleepPace;
import java.util.Optional;

public interface SensorDataRetriever {

    Optional<FakeSensorData> retrieveFakeSensorData();

    Optional<BloodPressure> retrieveBloodPressure();

    Optional<SleepPace> retrieveSleepPace();

}
