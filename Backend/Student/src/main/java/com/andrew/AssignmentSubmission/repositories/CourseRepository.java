package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Course findByName(String courseName);
}
