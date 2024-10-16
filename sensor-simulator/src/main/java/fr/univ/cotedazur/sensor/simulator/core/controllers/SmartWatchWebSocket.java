package fr.univ.cotedazur.sensor.simulator.core.controllers;

import fr.univ.cotedazur.sensor.simulator.core.interfaces.SensorDataRetriever;
import fr.univ.cotedazur.sensor.simulator.core.records.BloodPressure;
import fr.univ.cotedazur.sensor.simulator.core.records.FakeSensorData;
import fr.univ.cotedazur.sensor.simulator.core.records.SleepPace;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SmartWatchWebSocket {

    private final SensorDataRetriever sensorDataRetriever;

    public SmartWatchWebSocket(SensorDataRetriever sensorDataRetriever) {
        this.sensorDataRetriever = sensorDataRetriever;
    }

    @MessageMapping("/sensor-data")
    @SendTo("/topic/sensor-data")
    public FakeSensorData sendSensorData() {
        return this.sensorDataRetriever.retrieveFakeSensorData().orElseThrow();
    }

    @MessageMapping("/blood-pressure")
    @SendTo("/topic/blood-pressure")
    public BloodPressure bloodPressure() {
        return this.sensorDataRetriever.retrieveBloodPressure().orElseThrow();
    }

    @MessageMapping("/sleep-pace")
    @SendTo("/topic/sleep-pace")
    public SleepPace sleepPace() {
        return this.sensorDataRetriever.retrieveSleepPace().orElseThrow();
    }

}
