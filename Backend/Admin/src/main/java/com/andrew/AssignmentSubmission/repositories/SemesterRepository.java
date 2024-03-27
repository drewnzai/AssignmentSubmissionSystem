package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    Semester findByName(String name);
}
