package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    boolean existsByTitle(String title);

    Assignment findByTitle(String title);

    List<Assignment> findAllByUnit(Unit unit);
}
