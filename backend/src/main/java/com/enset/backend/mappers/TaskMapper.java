package com.enset.backend.mappers;



import com.enset.backend.dtos.TaskRequest;
import com.enset.backend.dtos.TaskResponse;
import com.enset.backend.dtos.TaskUpdateRequest;
import com.enset.backend.entities.Project;
import com.enset.backend.entities.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    /**
     * Convertit un TaskRequest en entité Task
     */
    public Task toEntity(TaskRequest request) {
        if (request == null) {
            return null;
        }

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        task.setCompleted(false); // Par défaut, une nouvelle tâche n'est pas complétée

        return task;
    }

    /**
     * Convertit un TaskRequest en entité Task avec le projet
     */
    public Task toEntity(TaskRequest request, Project project) {
        if (request == null) {
            return null;
        }

        Task task = toEntity(request);
        task.setProject(project);

        return task;
    }

    /**
     * Met à jour une entité Task existante avec les données d'un TaskUpdateRequest
     */
    public void updateEntityFromRequest(Task task, TaskUpdateRequest request) {
        if (task == null || request == null) {
            return;
        }

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            task.setTitle(request.getTitle());
        }

        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }

        if (request.getDueDate() != null) {
            task.setDueDate(request.getDueDate());
        }

        if (request.getCompleted() != null) {
            task.setCompleted(request.getCompleted());
        }
    }

    /**
     * Convertit une entité Task en TaskResponse
     */
    public TaskResponse toResponse(Task task) {
        if (task == null) {
            return null;
        }

        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setDueDate(task.getDueDate());
        response.setCompleted(task.isCompleted());
        response.setCreatedAt(task.getCreatedAt());
        response.setUpdatedAt(task.getUpdatedAt());

        // Définir le projectId si le projet existe
        if (task.getProject() != null) {
            response.setProjectId(task.getProject().getId());
        }

        return response;
    }

    /**
     * Bascule l'état de complétion d'une tâche
     */
    public void toggleCompletion(Task task) {
        if (task != null) {
            task.setCompleted(!task.isCompleted());
        }
    }
}
