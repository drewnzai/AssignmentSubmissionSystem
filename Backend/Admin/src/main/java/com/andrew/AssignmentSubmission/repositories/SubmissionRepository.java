package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Student;
import com.andrew.AssignmentSubmission.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    boolean existsByAssignment(Assignment assignment);

    boolean existsByStudent(Student student);

    boolean existsByAssignmentAndStudent(Assignment assignment, Student student);

    Submission findSubmissionByAssignmentAndStudent(Assignment assignment, Student student);

    List<Submission> findAllByStudent(Student student);
}
