package com.enset.backend.dtos;


import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean completed;
    private Long projectId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
