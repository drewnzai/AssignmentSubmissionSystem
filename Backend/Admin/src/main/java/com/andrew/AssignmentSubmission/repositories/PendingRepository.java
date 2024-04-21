package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Pending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PendingRepository extends JpaRepository<Pending, Long> {
    List<Pending> findAllByTitle(String title);
}
