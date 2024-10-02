package fr.univ.cotedazur.sensor.simulator.core.implementations;

import com.github.javafaker.Faker;
import fr.univ.cotedazur.sensor.simulator.core.records.BloodPressure;
import fr.univ.cotedazur.sensor.simulator.core.records.FakeSensorData;
import fr.univ.cotedazur.sensor.simulator.core.interfaces.SensorDataRetriever;
import fr.univ.cotedazur.sensor.simulator.core.records.SleepPace;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class FakeSensorDataRetriever implements SensorDataRetriever {

    private final Faker faker;

    public FakeSensorDataRetriever(Faker faker) {
        this.faker = faker;
    }

    @Override
    public FakeSensorData retrieveData() {
        return new FakeSensorData(
                faker.number().numberBetween(50, 200),
                new BloodPressure(faker.number().numberBetween(0,20), faker.number().numberBetween(0,20)),
                faker.number().randomDigit(),
                faker.number().randomDouble(2,0,1),
                new SleepPace(faker.number().randomDigit(), faker.number().randomDigit(), faker.number().randomDigit(), faker.number().randomDigit(), faker.number().randomDigit()),
                faker.number().numberBetween(0, 50),
                faker.number().randomDigit()
        );
    }

}
