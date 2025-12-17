package com.enset.backend;

import com.enset.backend.Repository.UserRepository;
import com.enset.backend.entities.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) { // éviter les doublons
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

                userRepository.save(new User(
                        "admin@example.com",
                        encoder.encode("admin123"), // mot de passe
                        "Admin User",
                        "ADMIN",
                        true,
                        LocalDateTime.now()
                ));

                userRepository.save(new User(
                        "user@example.com",
                        encoder.encode("user123"),
                        "Regular User",
                        "USER",
                        true,
                        LocalDateTime.now()
                ));

                userRepository.save(new User(
                        "test@example.com",
                        encoder.encode("test123"),
                        "Test User",
                        "USER",
                        true,
                        LocalDateTime.now()
                ));

                System.out.println("Users initialized successfully!");
            }
        };
    }
}


