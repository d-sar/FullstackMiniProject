package com.enset.backend.mappers;

import com.enset.backend.dtos.ProjectDetailResponse;
import com.enset.backend.dtos.ProjectProgressResponse;
import com.enset.backend.dtos.ProjectRequest;
import com.enset.backend.dtos.ProjectResponse;
import com.enset.backend.entities.Project;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    private final TaskMapper taskMapper;

    public ProjectMapper(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    /**
     * Convertit un ProjectRequest en entité Project
     */
    public Project toEntity(ProjectRequest request) {
        if (request == null) {
            return null;
        }

        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());

        return project;
    }

    /**
     * Met à jour une entité Project existante avec les données d'un ProjectRequest
     */
    public void updateEntityFromRequest(Project project, ProjectRequest request) {
        if (project == null || request == null) {
            return;
        }

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            project.setTitle(request.getTitle());
        }

        if (request.getDescription() != null) {
            project.setDescription(request.getDescription());
        }
    }

    /**
     * Convertit une entité Project en ProjectResponse
     */
    public ProjectResponse toResponse(Project project) {
        if (project == null) {
            return null;
        }

        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setTitle(project.getTitle());
        response.setDescription(project.getDescription());
        response.setTotalTasks(project.getTotalTasks());
        response.setCompletedTasks(project.getCompletedTasks());
        response.setProgressPercentage(project.getProgressPercentage());
        response.setCreatedAt(project.getCreatedAt());
        response.setUpdatedAt(project.getUpdatedAt());

        return response;
    }

    /**
     * Convertit une entité Project en ProjectDetailResponse (avec les tâches)
     */
    public ProjectDetailResponse toDetailResponse(Project project) {
        if (project == null) {
            return null;
        }

        ProjectDetailResponse response = new ProjectDetailResponse();
        response.setId(project.getId());
        response.setTitle(project.getTitle());
        response.setDescription(project.getDescription());
        response.setTotalTasks(project.getTotalTasks());
        response.setCompletedTasks(project.getCompletedTasks());
        response.setProgressPercentage(project.getProgressPercentage());
        response.setCreatedAt(project.getCreatedAt());
        response.setUpdatedAt(project.getUpdatedAt());

        // Mapper les tâches
        if (project.getTasks() != null) {
            response.setTasks(
                    project.getTasks().stream()
                            .map(taskMapper::toResponse)
                            .collect(Collectors.toList())
            );
        }

        return response;
    }

    /**
     * Convertit une entité Project en ProjectProgressResponse
     */
    public ProjectProgressResponse toProgressResponse(Project project) {
        if (project == null) {
            return null;
        }

        ProjectProgressResponse response = new ProjectProgressResponse();
        response.setProjectId(project.getId());
        response.setTotalTasks(project.getTotalTasks());
        response.setCompletedTasks(project.getCompletedTasks());
        response.setProgressPercentage(project.getProgressPercentage());

        return response;
    }
}