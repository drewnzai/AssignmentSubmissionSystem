package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Pending;
import com.andrew.AssignmentSubmission.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PendingRepository extends JpaRepository<Pending, Long> {
    boolean existsByTitle(String title);

    Pending findByTitle(String title);

    List<Pending> findAllByUser(User user);
}
