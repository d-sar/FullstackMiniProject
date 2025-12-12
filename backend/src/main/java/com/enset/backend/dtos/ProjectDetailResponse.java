package com.enset.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Data @AllArgsConstructor @NoArgsConstructor
public class ProjectDetailResponse {
    private Long id;
    private String title;
    private String description;
    private List<TaskResponse> tasks;
    private int totalTasks;
    private int completedTasks;
    private double progressPercentage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
