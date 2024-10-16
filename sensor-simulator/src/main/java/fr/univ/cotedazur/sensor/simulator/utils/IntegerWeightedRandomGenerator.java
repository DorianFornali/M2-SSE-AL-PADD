package fr.univ.cotedazur.sensor.simulator.utils;

import java.util.stream.IntStream;

public class IntegerWeightedRandomGenerator extends WeightedRandomGenerator<Integer> {

    public IntegerWeightedRandomGenerator add(int from, int to, double weight) {
        final int sub = to - from;
        final double div = weight / sub;
        IntStream.rangeClosed(from, to).forEach(value -> add(value, div));
        return this;
    }

}
