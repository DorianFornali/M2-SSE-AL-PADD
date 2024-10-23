package com.padd.house.sensor.simulator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@EnableWebSocket
@SpringBootApplication
public class SensorSimulatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(SensorSimulatorApplication.class, args);
	}

}
