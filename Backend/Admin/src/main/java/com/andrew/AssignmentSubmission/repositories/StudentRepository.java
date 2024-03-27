package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByRegistration(String registration);

    Student findByRegistration(String registration);
}
