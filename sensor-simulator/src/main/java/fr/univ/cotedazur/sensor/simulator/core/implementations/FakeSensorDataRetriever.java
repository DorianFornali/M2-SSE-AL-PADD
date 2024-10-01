package fr.univ.cotedazur.sensor.simulator.core.implementations;

import fr.univ.cotedazur.sensor.simulator.core.entities.FakeSensorData;
import fr.univ.cotedazur.sensor.simulator.core.interfaces.SensorDataRetriever;

import java.util.Collection;
import java.util.List;

public class FakeSensorDataRetriever implements SensorDataRetriever {


    @Override
    public Collection<FakeSensorData> retrieveData() {
        return List.of();
    }


}
