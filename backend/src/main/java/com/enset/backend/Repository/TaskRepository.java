package com.enset.backend.Repository;

import com.enset.backend.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByProjectIdOrderByCreatedAtDesc(Long projectId);
    List<Task> findByProjectId(Long projectId);
    long countByProjectId(Long projectId);
    long countByProjectIdAndCompleted(Long projectId, boolean completed);
}
