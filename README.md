# Locker-backend

## Prerequesies

1. build kafka image from [this](https://github.com/wurstmeister/kafka-docker)

2. edit docker-compose.yml

    ```yml
    version: '2'
        services:
        zookeeper:
            image: wurstmeister/zookeeper
            ports:
            - "2181:2181"
        kafka:
            build: .
            ports:
            - "9092:9092"
        environment:
            KAFKA_ADVERTISED_HOST_NAME: localhost
            KAFKA_CREATE_TOPICS: "locker-info:1:1"
            KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
            volumes:
            - /var/run/docker.sock:/var/run/docker.sock  
    ```
