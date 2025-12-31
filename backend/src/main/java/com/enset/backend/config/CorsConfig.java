package com.enset.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Autoriser l'origine de votre frontend
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));

        // Autoriser les méthodes HTTP nécessaires
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // Autoriser tous les headers
        configuration.setAllowedHeaders(List.of("*"));

        // Exposer certains headers au frontend (utile pour JWT)
        configuration.setExposedHeaders(List.of("Authorization", "Content-Type"));

        // Autoriser l'envoi des cookies ou token
        configuration.setAllowCredentials(true);

        // Durée de vie du cache CORS en secondes
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // Appliquer la configuration à toutes les routes
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
