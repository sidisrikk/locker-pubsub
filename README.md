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

3. set initial state pub/sub by Terminal
    - run consumer

    ```sh
    bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic locker-info --from-beginning
    ```

    - run producer

    ```sh
    bin/kafka-console-producer.sh --broker-list localhost:9092 --topic locker-info
    ```

    - pub first initial state, unit6-10 reserved

    ```text
    {"lockerInfo":{"no":1,"unit":[{"no":"1","passcode":"","status":"available"},{"no":"2","passcode":"","status":"available"},{"no":"3","passcode":"","status":"available"},{"no":"4","passcode":"","status":"available"},{"no":"5","passcode":"","status":"available"},{"no":"6","passcode":"799270","status":"reserved"},{"no":"7","passcode":"064463","status":"reserved"},{"no":"8","passcode":"571804","status":"reserved"},{"no":"9","passcode":"476234","status":"reserved"},{"no":"10","passcode":"644552","status":"reserved"},{"no":"11","passcode":"","status":"available"},{"no":"12","passcode":"","status":"available"}]}}
    ```