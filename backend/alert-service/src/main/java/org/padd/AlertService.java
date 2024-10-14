package org.padd;

import io.nats.client.Connection;
import io.nats.client.Nats;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;
import org.jboss.logging.Logger;
import org.padd.config.NATSConfig;
import org.padd.model.AlertObject;

@Singleton
public class AlertService {

    private static final Logger log = Logger.getLogger(AlertService.class);
    NATSConfig natsConfig;

    @Inject
    public AlertService(NATSConfig natsConfig){
        this.natsConfig = natsConfig;
        log.info("AlertService initialized");
    }

    public void handleIncomingAlert(AlertObject alertObject){
        log.infof("Handling incoming alert %s ...", alertObject);

        try {
            Connection connect = Nats.connect(natsConfig.getBrokerURL());
            String topic = natsConfig.getProducerTopic() + "." + alertObject.getId();
            connect.publish(topic,
                    alertObject.toString().getBytes());
            log.infof("Alert %s published to NATS on topic %s", alertObject.getId(), topic);
        }
        catch (Exception e) {
            log.error("Error while connecting to NATS", e);
        }
    }

}