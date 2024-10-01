package fr.univ.cotedazur.sensor.simulator.core.interfaces;

import fr.univ.cotedazur.sensor.simulator.core.entities.FakeSensorData;

import java.util.Collection;

public interface SensorDataRetriever {

    Collection<FakeSensorData> retrieveData();

}
