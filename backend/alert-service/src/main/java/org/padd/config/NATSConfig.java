package org.padd.config;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.Getter;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Getter
@ApplicationScoped
public class NATSConfig {
    @ConfigProperty(name = "nats.producer.topic")
    String producerTopic;

    @ConfigProperty(name = "nats.broker.url")
    String brokerURL;
}
