package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
}
