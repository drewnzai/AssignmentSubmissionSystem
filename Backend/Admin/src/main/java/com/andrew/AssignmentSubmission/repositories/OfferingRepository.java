package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.models.UnitCourseOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferingRepository extends JpaRepository<UnitCourseOffering, Long> {
    List<UnitCourseOffering> findAllByUnit(Unit unit);
}
