package fr.univ.cotedazur.sensor.simulator.core.tasks;

import fr.univ.cotedazur.sensor.simulator.core.implementations.FakeSensorDataRetriever;
import fr.univ.cotedazur.sensor.simulator.core.interfaces.ScheduledTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@EnableAsync
@Component
public class SendFakeDataTask implements ScheduledTask {

    private final FakeSensorDataRetriever fakeSensorDataRetriever;

    public SendFakeDataTask(FakeSensorDataRetriever fakeSensorDataRetriever) {
        this.fakeSensorDataRetriever = fakeSensorDataRetriever;
    }

    @Async
    @Scheduled(fixedRate = 1000L)
    @Override
    public void runTask() {
        logger.info("Running fake collection of data -> {}", fakeSensorDataRetriever.retrieveData());
    }

}
