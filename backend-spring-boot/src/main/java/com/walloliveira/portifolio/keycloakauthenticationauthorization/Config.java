package com.walloliveira.portifolio.keycloakauthenticationauthorization;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
class Config {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}