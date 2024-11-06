package com.padd.house.sensor.simulator.core.implementations;

import com.padd.house.sensor.simulator.core.interfaces.SensorDataRetriever;
import com.padd.house.sensor.simulator.core.records.FakeSensorData;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest
class FakeSensorDataRetrieverTest {

    @Autowired
    SensorDataRetriever sensorDataRetriever;

    @Test
    void testFakeSensorData() {
        FakeSensorData fakeSensorData = sensorDataRetriever.retrieveFakeSensorData().orElseThrow();
        logger.info("{}", fakeSensorData);
    }

}