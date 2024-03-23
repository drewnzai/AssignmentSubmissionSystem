package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.repositories.CourseRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseService {
    private CourseRepository courseRepository;

    public Course getCourseByName(String courseName){
        return courseRepository.findByName(courseName)
                .orElseThrow(() -> new AssignmentException("No course by name: "+ courseName));
    }


}
