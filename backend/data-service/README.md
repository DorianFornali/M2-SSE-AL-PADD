# Data Service

Build Docker Image
```
docker build -t data-service .
```

Run Docker Container
```
docker run --rm -it -p 8087:8087 --name data-service data-service
```