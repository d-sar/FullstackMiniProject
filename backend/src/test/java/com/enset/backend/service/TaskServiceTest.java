package com.enset.backend.service;

import com.enset.backend.Repository.ProjectRepository;
import com.enset.backend.Repository.TaskRepository;
import com.enset.backend.Services.TaskService;
import com.enset.backend.dtos.TaskRequest;
import com.enset.backend.dtos.TaskResponse;
import com.enset.backend.entities.Project;
import com.enset.backend.entities.Task;
import com.enset.backend.mappers.TaskMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private TaskMapper taskMapper;

    @InjectMocks
    private TaskService taskService;

    @Test
    void shouldCreateTask() {
        // Given
        TaskRequest request = new TaskRequest();
        request.setTitle("Write tests");
        request.setProjectId(1L);

        Project project = new Project();
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        Task taskEntity = new Task();
        when(taskMapper.toEntity(request, project)).thenReturn(taskEntity);

        Task savedEntity = new Task();
        savedEntity.setTitle("Write tests");
        when(taskRepository.save(taskEntity)).thenReturn(savedEntity);

        TaskResponse response = new TaskResponse();
        response.setTitle("Write tests");
        when(taskMapper.toResponse(savedEntity)).thenReturn(response);

        // When
        TaskResponse result = taskService.createTask(request);

        // Then
        assertNotNull(result);
        assertEquals("Write tests", result.getTitle());
    }

    @Test
    void shouldToggleTaskCompletion() {
        // Given
        Task taskEntity = new Task();
        taskEntity.setCompleted(false);

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(taskEntity));

        // The mapper toggles completion
        doAnswer(invocation -> {
            taskEntity.setCompleted(true);
            return null;
        }).when(taskMapper).toggleCompletion(taskEntity);


        Task savedEntity = new Task();
        savedEntity.setCompleted(true);
        when(taskRepository.save(taskEntity)).thenReturn(savedEntity);

        TaskResponse response = new TaskResponse();
        response.setCompleted(true);
        when(taskMapper.toResponse(savedEntity)).thenReturn(response);

        // When
        TaskResponse result = taskService.toggleTaskCompletion(1L);

        // Then
        assertTrue(result.isCompleted());
    }
}
