package com.enset.backend.service;

import com.enset.backend.Repository.ProjectRepository;
import com.enset.backend.Repository.TaskRepository;
import com.enset.backend.Services.ProjectService;
import com.enset.backend.dtos.ProjectProgressResponse;
import com.enset.backend.dtos.ProjectRequest;
import com.enset.backend.dtos.ProjectResponse;
import com.enset.backend.entities.Project;
import com.enset.backend.mappers.ProjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock private ProjectRepository projectRepository;
    @Mock private TaskRepository taskRepository;
    @Mock private ProjectMapper projectMapper;

    @InjectMocks private ProjectService projectService;

    @Test
    void shouldCreateProjectSuccessfully() {
        ProjectRequest request = new ProjectRequest();
        request.setTitle("Internship Project");

        Project projectEntity = new Project();
        projectEntity.setTitle("Internship Project");

        ProjectResponse response = new ProjectResponse();
        response.setTitle("Internship Project");

        when(projectMapper.toEntity(request)).thenReturn(projectEntity);
        when(projectRepository.save(projectEntity)).thenReturn(projectEntity);
        when(projectMapper.toResponse(projectEntity)).thenReturn(response);

        ProjectResponse saved = projectService.createProject(request);

        assertNotNull(saved);
        assertEquals("Internship Project", saved.getTitle());
    }
    @Test
    void shouldCalculateProgressCorrectly() {
        Long projectId = 1L;

        Project project = new Project();
        project.setId(projectId);

        // Le service appelle findById puis projectMapper.toProgressResponse(project)
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        // On mock ce que le mapper doit retourner
        ProjectProgressResponse mockedResponse = new ProjectProgressResponse();
        mockedResponse.setProgressPercentage(40);

        when(projectMapper.toProgressResponse(project)).thenReturn(mockedResponse);

        // Appel
        ProjectProgressResponse progress = projectService.getProjectProgress(projectId);

        // Vérification
        assertNotNull(progress);
        assertEquals(40, progress.getProgressPercentage());
    }



}
