package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.UnitCourseOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferingRepository extends JpaRepository<UnitCourseOffering, Long> {
}
