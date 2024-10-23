package com.padd.house.sensor.simulator.utils;

import org.apache.commons.math3.random.MersenneTwister;
import org.apache.commons.math3.random.RandomGenerator;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class WeightedRandomGenerator<T> implements UtilsRandomGenerator<T> {

    private final RandomGenerator randomGenerator = new MersenneTwister();
    private final Map<T, Double> weightMap = new HashMap<>();

    @Override
    public WeightedRandomGenerator<T> add(T value, double weight) {
        weightMap.put(value, weight);
        return this;
    }

    @Override
    public T getWeightedRandom() {
        double totalWeight = weightMap.values().stream().mapToDouble(Double::doubleValue).sum();
        double randomValue = randomGenerator.nextDouble() * totalWeight;

        for (Map.Entry<T, Double> entry : weightMap.entrySet()) {
            if (randomValue < entry.getValue()) {
                return entry.getKey();
            }
            randomValue -= entry.getValue();
        }
        return null;
    }

    @Override
    public void clearWeights() {
        weightMap.clear();
    }
}
