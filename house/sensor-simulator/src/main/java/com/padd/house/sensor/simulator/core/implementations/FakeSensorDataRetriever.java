package com.padd.house.sensor.simulator.core.implementations;

import com.padd.house.sensor.simulator.core.records.BloodPressure;
import com.padd.house.sensor.simulator.core.records.FakeSensorData;
import com.padd.house.sensor.simulator.core.interfaces.SensorDataRetriever;
import com.padd.house.sensor.simulator.core.records.SleepPace;
import com.padd.house.sensor.simulator.utils.IntegerWeightedRandomGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Component
public class FakeSensorDataRetriever implements SensorDataRetriever {

    private final IntegerWeightedRandomGenerator integerWeightedRandomGenerator = new IntegerWeightedRandomGenerator();

    @Override
    public Optional<FakeSensorData> retrieveFakeSensorData(int index, LocalDateTime initialDateTime) {
        int heartRate = integerWeightedRandomGenerator.add(55, 85, 0.8).add(85, 150, .1).add(40, 55, .1).getWeightedRandom();
        integerWeightedRandomGenerator.clearWeights();
        int stressLevel = integerWeightedRandomGenerator.add(0, 20, 0.2).add(20, 40, 0.2).add(40, 60, 0.2).add(60, 80, 0.2).add(80, 100, 0.2).getWeightedRandom();
        integerWeightedRandomGenerator.clearWeights();
        int oxygenLevel = integerWeightedRandomGenerator.add(80, 100, 0.98).add(70, .1).add(75, .1).getWeightedRandom();
        integerWeightedRandomGenerator.clearWeights();
        int bodyTemperature = integerWeightedRandomGenerator.add(36,38,.9).add(38, 41, 0.1).getWeightedRandom();
        integerWeightedRandomGenerator.clearWeights();
        int acceleration = integerWeightedRandomGenerator.add(0, .9).add(10, .1).getWeightedRandom();
        integerWeightedRandomGenerator.clearWeights();
        return Optional.ofNullable(FakeSensorData.builder()
                        .acceleration(acceleration)
                        .timestamp(initialDateTime.minusHours(index))
                        .bloodPressure(retrieveBloodPressure().orElseThrow())
                        .heartRate(heartRate)
                        .stressLevel(stressLevel)
                        .bloodOxygenation(oxygenLevel)
                        .bodyTemperature(bodyTemperature).build());
    }

    @Override
    public Optional<BloodPressure> retrieveBloodPressure() {
        int diastolic = integerWeightedRandomGenerator.add(70,90, .9).add(90,110).getWeightedRandom();
        integerWeightedRandomGenerator.clearWeights();
        int systolic = integerWeightedRandomGenerator.add(130,140, .9).add(100, 130, .05).add(140, 160, .05).getWeightedRandom();
        integerWeightedRandomGenerator.clearWeights();
        return Optional.ofNullable(BloodPressure.builder()
                        .diastolic(diastolic)
                        .systolic(systolic)
                        .build());
    }

    @Override
    public Optional<SleepPace> retrieveSleepPace(int index, LocalDateTime initialDateTime) {
        int totalSleepDuration = getRandomSleepDuration();
        int paradoxSleep = generateSleepComponent(totalSleepDuration, 0.1, 0.2);
        int deepSlowParadoxSleep = generateSleepComponent(totalSleepDuration, 0.1, 0.15);
        int deepSlowSleep = generateSleepComponent(totalSleepDuration, 0.2, 0.4);
        int lightSlowSleep = totalSleepDuration - (paradoxSleep + deepSlowParadoxSleep + deepSlowSleep);

        if (lightSlowSleep < 0) {
            lightSlowSleep = 0;
        }

        return Optional.ofNullable(SleepPace.builder()
                .paradoxSleep(paradoxSleep)
                .deepSlowParadoxSleep(deepSlowParadoxSleep)
                .deepSlowSleep(deepSlowSleep)
                .lightSlowSleep(lightSlowSleep)
                .sleepDuration(totalSleepDuration)
                .timestamp(initialDateTime.minusHours(index))
                .build());
    }

    private int getRandomSleepDuration() {
        int minMinutes = 300;
        int maxMinutes = 720;
        return minMinutes + (int) (Math.random() * (maxMinutes - minMinutes));
    }

    private int generateSleepComponent(int totalDuration, double minFraction, double maxFraction) {
        double fraction = minFraction + (Math.random() * (maxFraction - minFraction));
        return (int) (totalDuration * fraction);
    }
}
