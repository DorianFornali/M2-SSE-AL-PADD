package com.padd.house.sensor.simulator.core.implementations;

import com.padd.house.sensor.simulator.core.interfaces.SensorDataRetriever;
import com.padd.house.sensor.simulator.core.records.FakeSensorData;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@Slf4j
@SpringBootTest
class FakeSensorDataRetrieverTest {

    private int index = 0;
    private final LocalDateTime initialDateTime = LocalDateTime.now();
    @Autowired
    SensorDataRetriever sensorDataRetriever;

    @Test
    void testFakeSensorData() {
        FakeSensorData fakeSensorData = sensorDataRetriever.retrieveFakeSensorData(index, initialDateTime).orElseThrow();
        logger.info("{}", fakeSensorData);
    }

}