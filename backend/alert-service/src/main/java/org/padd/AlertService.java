package org.padd;

import io.nats.client.Connection;
import io.nats.client.Nats;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.jboss.logging.Logger;
import org.padd.config.NATSConfig;
import org.padd.model.AlertObject;

@Singleton
public class AlertService {

    private static final Logger log = Logger.getLogger(AlertService.class);
    private final ObjectMapper objectMapper;
    NATSConfig natsConfig;

    @Inject
    public AlertService(NATSConfig natsConfig){
        this.natsConfig = natsConfig;
        this.objectMapper = new ObjectMapper();
        log.info("AlertService initialized");
    }

    public void handleIncomingAlert(AlertObject alertObject){
        log.infof("Handling incoming alert %s ...", alertObject);

        try {
            Connection connect = Nats.connect(natsConfig.getBrokerURL());
            String topic = natsConfig.getProducerTopic() + "." + alertObject.getId();
            String jsonMessage = objectMapper.writeValueAsString(alertObject);
            connect.publish(topic,
                    jsonMessage.getBytes());
            log.infof("Alert %s published to NATS on topic %s", alertObject.getId(), topic);
        }
        catch (Exception e) {
            log.error("Error while connecting to NATS", e);
        }
    }
}