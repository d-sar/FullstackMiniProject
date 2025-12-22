package com.enset.backend.controller;



import com.enset.backend.Services.ProjectService;
import com.enset.backend.dtos.ProjectResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    private String token;

    @BeforeEach
    void setUp() {
        // JWT token pré-généré ou obtenu via authentification
        token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZXd1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzY1OTY3Njk3LCJleHAiOjE3NjYwNTQwOTd9.oiJm0pv2mRbW1vq6QafvKQ72FdPUdZMnBc71FTl2gnJbhJjrxOkGEm093Z_bPjgeegqmn9xMl0h9lHr4WC4Dcw";
    }

    @Test
    void shouldGetAllProjects() throws Exception {
        when(projectService.getAllProjects()).thenReturn(List.of(new ProjectResponse()));

        mockMvc.perform(get("/api/projects")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void shouldCreateProject() throws Exception {
        when(projectService.createProject(any())).thenReturn(new ProjectResponse());

        mockMvc.perform(post("/api/projects")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Project Alpha",
                                  "description": "A sample project for testing"
                                }
                                """))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldFailWithoutToken() throws Exception {
        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Should Fail",
                                  "description": "This should return 401"
                                }
                                """))
                .andExpect(status().isUnauthorized());
    }

//    @Test
//    void shouldGetProjectById() throws Exception {
//        when(projectService.getProjectById(1L)).thenReturn(new ProjectResponse());
//
//        mockMvc.perform(get("/api/projects/1")
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk());
//    }

    @Test
    void shouldUpdateProject() throws Exception {
        when(projectService.updateProject(any(), any())).thenReturn(new ProjectResponse());

        mockMvc.perform(put("/api/projects/1")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Updated Project Alpha",
                                  "description": "Updated description"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void shouldDeleteProject() throws Exception {
        mockMvc.perform(delete("/api/projects/1")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
    }
}
