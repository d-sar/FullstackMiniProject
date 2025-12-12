package com.enset.backend.Services;

import com.enset.backend.Repository.ProjectRepository;
import com.enset.backend.Repository.TaskRepository;
import com.enset.backend.dtos.TaskRequest;
import com.enset.backend.dtos.TaskResponse;
import com.enset.backend.dtos.TaskUpdateRequest;
import com.enset.backend.entities.Project;
import com.enset.backend.entities.Task;
import com.enset.backend.exceptions.ResourceNotFoundException;
import com.enset.backend.mappers.TaskMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final TaskMapper taskMapper;

    public TaskResponse createTask(TaskRequest request) {
        // Trouver le projet
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Project not found with id: " + request.getProjectId()));

        // Utiliser le mapper pour créer l'entité avec le projet
        Task task = taskMapper.toEntity(request, project);

        // Sauvegarder
        Task savedTask = taskRepository.save(task);

        // Retourner la réponse mappée
        return taskMapper.toResponse(savedTask);
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> getTasksByProject(Long projectId) {
        // Vérifier que le projet existe
        projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Project not found with id: " + projectId));

        return taskRepository.findByProjectIdOrderByCreatedAtDesc(projectId)
                .stream()
                .map(taskMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long id) {
        Task task = findTaskById(id);
        return taskMapper.toResponse(task);
    }

    public TaskResponse updateTask(Long id, TaskUpdateRequest request) {
        Task task = findTaskById(id);

        // Utiliser le mapper pour mettre à jour l'entité
        taskMapper.updateEntityFromRequest(task, request);

        // Sauvegarder
        Task updatedTask = taskRepository.save(task);

        // Retourner la réponse mappée
        return taskMapper.toResponse(updatedTask);
    }

    public TaskResponse toggleTaskCompletion(Long id) {
        Task task = findTaskById(id);

        // Utiliser le mapper pour basculer la complétion
        taskMapper.toggleCompletion(task);

        // Sauvegarder
        Task updatedTask = taskRepository.save(task);

        // Retourner la réponse mappée
        return taskMapper.toResponse(updatedTask);
    }

    public void deleteTask(Long id) {
        Task task = findTaskById(id);
        taskRepository.delete(task);
    }

    // Helper method
    private Task findTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Task not found with id: " + id));
    }
}
