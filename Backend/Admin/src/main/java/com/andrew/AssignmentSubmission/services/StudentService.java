package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.StudentRegisterRequest;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.models.Student;
import com.andrew.AssignmentSubmission.repositories.CourseRepository;
import com.andrew.AssignmentSubmission.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class StudentService {

    private StudentRepository studentRepository;
    private CourseRepository courseRepository;

    public boolean addStudent(StudentRegisterRequest registerRequest){
        if
        (studentRepository.existsByRegistration(registerRequest.getRegistration())){
            return false;
        }
        else{

            Student student = new Student();
            Course course = courseRepository.findByName(registerRequest.getCourseName())
                            .orElseThrow(
                                    () -> new AssignmentException("No Such Course")
                            );

            student.setFirstName(registerRequest.getFirstName());
            student.setLastName(registerRequest.getLastName());
            student.setEmail(registerRequest.getFirstName().toLowerCase()
                    + "." +
                    registerRequest.getLastName().toLowerCase()
                    + "@egerton.ac.ke");
            student.setPassword(registerRequest.getFirstName() + registerRequest.getLastName());
            student.setEnrolledCourse(course);
            student.setCreated(Instant.now());
            student.setEnabled(true);

            studentRepository.save(student);

            return true;

        }
    }

}
