package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Assignment findByTitle(String title);
}
