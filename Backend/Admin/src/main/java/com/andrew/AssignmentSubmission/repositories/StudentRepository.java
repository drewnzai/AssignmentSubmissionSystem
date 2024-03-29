package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByRegistration(String registration);

    Student findByRegistration(String registration);

    List<Student> findAllByEnrolledCourse(Course course);
}
