package fr.univ.cotedazur.sensor.simulator.core.interfaces;

import fr.univ.cotedazur.sensor.simulator.core.records.BloodPressure;
import fr.univ.cotedazur.sensor.simulator.core.records.FakeSensorData;
import fr.univ.cotedazur.sensor.simulator.core.records.SleepPace;
import java.util.Optional;

public interface SensorDataRetriever {

    Optional<FakeSensorData> retrieveFakeSensorData();

    Optional<BloodPressure> retrieveBloodPressure();

    Optional<SleepPace> retrieveSleepPace();

}
