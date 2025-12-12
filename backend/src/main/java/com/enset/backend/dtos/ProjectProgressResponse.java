package com.enset.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ProjectProgressResponse {
    private Long projectId;
    private int totalTasks;
    private int completedTasks;
    private double progressPercentage;

}
