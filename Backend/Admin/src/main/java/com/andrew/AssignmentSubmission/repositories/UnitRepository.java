package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
}
