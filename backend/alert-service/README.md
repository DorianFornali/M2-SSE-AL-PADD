# alert-service

To build the image, run the following command:

```bash
./build_image.sh
```

To run the container in standalone (no docker compose), run the following command:

```bash
./start_in_docker.sh
```

This service is available at `http://localhost/alert/`
    <br>You can check the health of the service at `http://localhost/alert/health`

- This service proposes one endpoint: POST http://localhost/alert/alert
  <br><t>This service is responsible for checking if the alert is justified, if yes it publishes on NATS
  for the notification service to behave accordingly.

  You can find the documentation at `http://localhost/alert/docs` TODO! NOT YET IMPLEMENTED