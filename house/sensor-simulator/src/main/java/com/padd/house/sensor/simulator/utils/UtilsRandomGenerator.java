package com.padd.house.sensor.simulator.utils;

public interface UtilsRandomGenerator<T> {

    UtilsRandomGenerator<T> add(T value, double weight);

    void clearWeights();

    T getWeightedRandom();

}
