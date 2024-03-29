package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
    boolean existsByName(String name);

    Unit findByName(String name);

    List<Unit> findAllByLecturer(User lecturer);

    boolean existsByCode(String code);

    Unit findByCode(String unitCode);
}
