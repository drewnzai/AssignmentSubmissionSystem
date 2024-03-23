package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {

    private CourseService courseService;

}
