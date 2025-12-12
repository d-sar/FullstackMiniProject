package com.enset.backend.Services;

import com.enset.backend.Repository.ProjectRepository;
import com.enset.backend.dtos.ProjectDetailResponse;
import com.enset.backend.dtos.ProjectProgressResponse;
import com.enset.backend.dtos.ProjectRequest;
import com.enset.backend.dtos.ProjectResponse;
import com.enset.backend.entities.Project;
import com.enset.backend.exceptions.ResourceNotFoundException;
import com.enset.backend.mappers.ProjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectResponse createProject(ProjectRequest request) {
        // Utiliser le mapper pour créer l'entité
        Project project = projectMapper.toEntity(request);

        // Sauvegarder
        Project savedProject = projectRepository.save(project);

        // Retourner la réponse mappée
        return projectMapper.toResponse(savedProject);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(projectMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponse getProjectById(Long id) {
        Project project = findProjectById(id);
        return projectMapper.toDetailResponse(project);
    }

    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = findProjectById(id);

        // Utiliser le mapper pour mettre à jour l'entité
        projectMapper.updateEntityFromRequest(project, request);

        // Sauvegarder
        Project updatedProject = projectRepository.save(project);

        // Retourner la réponse mappée
        return projectMapper.toResponse(updatedProject);
    }

    public void deleteProject(Long id) {
        Project project = findProjectById(id);
        projectRepository.delete(project);
    }

    @Transactional(readOnly = true)
    public ProjectProgressResponse getProjectProgress(Long id) {
        Project project = findProjectById(id);
        return projectMapper.toProgressResponse(project);
    }

    // Helper method
    private Project findProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Project not found with id: " + id));
    }
}
