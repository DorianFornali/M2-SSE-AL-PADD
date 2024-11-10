//package org.padd;
//
//import io.quarkus.runtime.StartupEvent;
//import jakarta.enterprise.event.Observes;
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.inject.Inject;
//
//@ApplicationScoped
//public class StartupListener {
//
//    @Inject
//    private HealthService healthService;
//
//    public void onStart(@Observes StartupEvent ev) {
//        System.out.println("Application is starting...");
//        healthService.init();
//    }
//}
