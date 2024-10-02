package fr.univ.cotedazur.sensor.simulator.core.records;

public record FakeSensorData(int heartRate,
                             BloodPressure bloodPressure,
                             int stressLevel,
                             double bloodOxygenation,
                             SleepPace sleepPace,
                             int bodyTemperature,
                             int acceleration) {
}
