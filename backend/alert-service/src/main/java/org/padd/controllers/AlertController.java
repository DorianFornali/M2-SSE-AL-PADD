package org.padd.controllers;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.padd.AlertService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.padd.model.AlertObject;

@Path("/alert")
public class AlertController {

    private static final Logger log = Logger.getLogger(AlertController.class);

    @Inject
    AlertService alertService;

    ObjectMapper objectMapper;

    public AlertController(){
        log.info("AlertController initialized");
        objectMapper = new ObjectMapper();
    }

    @POST
    @Consumes("application/json")
    public Response postAlert(String alert){
        // Instanciate AlertObject before passing it to the service
        log.infof("Received POST request with body: %s", alert);
        try {
            AlertObject alertObject = objectMapper.readValue(alert, AlertObject.class);
            // Pass the alertObject to the service
            alertService.handleIncomingAlert(alertObject);
            return Response.status(Response.Status.OK).entity("Alert received").build();
        } catch (Exception e) {
            //log.error("Error while parsing JSON", e);
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid JSON").build();
        }
    }
}
