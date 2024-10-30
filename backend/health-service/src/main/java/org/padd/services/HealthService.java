/*
- Subscribed to topic: triggerDataAnalysis.>; triggerFormAnalysis.>;
- Produce: reportHealthStatus.normal.{id}; reportHealthStatus.critical.{id} => which will be consumed by the notification service ;
*/

package org.padd.services;

import io.nats.client.Connection;
import io.nats.client.Dispatcher;
import io.nats.client.Nats;
import jakarta.annotation.PostConstruct;
import jakarta.inject.Inject;
import jakarta.enterprise.context.ApplicationScoped;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.padd.config.NATSConfig;
import org.jboss.logging.Logger;
import org.padd.entity.User;
import org.padd.repository.UserRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;


@ApplicationScoped
public class HealthService {
    private static final Logger log = Logger.getLogger(HealthService.class);
    private Connection natsConnection;
    private final NATSConfig natsConfig;
    private final UserRepository userRepository;
    private final HealthAnalysisService healthAnalysisService;

    @Inject
    public HealthService (NATSConfig natsConfig, UserRepository userRepository, HealthAnalysisService healthAnalysisService) {
        this.natsConfig = natsConfig;
        this.userRepository = userRepository;
        this.healthAnalysisService = healthAnalysisService;
        log.info("HealthService initialized");
    }

    @Transactional
    public void handleIncomingFlow(String id, String message) {
        /*
        :- Once a message received from nats with the id and timestamp of the update start/end
        :- If the user found, retrieve the healthRecordRepository concerning the patient
        :- If the user found, retrieve the sleepPaceRepository concerning the patient
        */
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(message);
            LocalDateTime startTimestamp = LocalDateTime.parse(jsonNode.get("start").asText());
            LocalDateTime endTimestamp = LocalDateTime.parse(jsonNode.get("end").asText());
            log.info("Handling the information concerning the patient with id: " + id);
            /* We start to fetch data from database and interpret the data */
            Optional<User> userOpt = Optional.ofNullable(userRepository.findById(Long.parseLong(id)));
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                healthAnalysisService.analyzeHealthAndSleep(user, startTimestamp, endTimestamp);
            } else {
                log.warn("User not found with id: " + id);
            }
        } catch (Exception e) {
            log.error ("Error parsing message", e);
        }

    }

    /* After injection, the init function is executed, to start listening on the nats server*/
    @PostConstruct
    public void init() {
        log.info("HealthService initialized");
        System.out.println("Connection to NATS server");

        try {
            log.infof("Connecting to NATS server: " + natsConfig.getBrokerURL());
            // Establish connection to NATS server
            natsConnection = Nats.connect(natsConfig.getBrokerURL());

            // Subscribe to the topic
            Dispatcher dispatcher = natsConnection.createDispatcher((msg) -> {
                String message = new String(msg.getData());
                String subject = msg.getSubject(); // for instance we don't have any message that is sent
                log.infof("Received message on subject: " + subject);
                log.infof("Received message: " + message);

                String[] subjectParts = subject.split("\\.");
                String id = subjectParts[1];
                log.infof("Extracted id: " + id);

                // The message contains the start and end timestamp
                handleIncomingFlow(id, message);
            });

            // Basic analyse of the data at the end of the day or for a specific period
            dispatcher.subscribe(natsConfig.getConsumeDataAnalysis() + ".>");

            // Need to confirm how to make for the form analysis
            dispatcher.subscribe(natsConfig.getConsumeFormAnalysis() + ".>");

        } catch (IOException | InterruptedException e) {
            log.error("Error connecting to NATS server", e);
        }
    }
}