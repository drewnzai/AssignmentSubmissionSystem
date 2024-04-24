package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Submission;
import com.andrew.AssignmentSubmission.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findAllByStudent(User user);
}
