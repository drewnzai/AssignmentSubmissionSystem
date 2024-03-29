package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.repositories.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseService {
    private CourseRepository courseRepository;



}
