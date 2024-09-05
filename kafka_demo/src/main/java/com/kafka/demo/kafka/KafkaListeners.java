package com.kafka.demo.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {
    @KafkaListener(
            topics = "sujanTopic",
            groupId = "groupId"
    )
    void listener(String data){
        System.out.println("Listener received data : "+data);
    }
}
