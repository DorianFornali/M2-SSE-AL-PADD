package fr.univcotedazur.sensorsimulator.core.implementations;

import fr.univcotedazur.sensorsimulator.core.entities.SensorData;
import fr.univcotedazur.sensorsimulator.core.interfaces.SensorDataRetriever;

import java.util.Collection;
import java.util.List;

public class FakeSensorDataRetriever implements SensorDataRetriever {


    @Override
    public Collection<SensorData> retrieveData() {
        return List.of();
    }


}
