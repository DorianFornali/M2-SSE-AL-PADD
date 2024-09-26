package fr.univcotedazur.sensorsimulator.core.interfaces;

import fr.univcotedazur.sensorsimulator.core.entities.SensorData;

import java.util.Collection;

public interface SensorDataRetriever {

    Collection<SensorData> retrieveData();

}
