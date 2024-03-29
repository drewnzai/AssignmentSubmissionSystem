package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.Student;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {

    private UserRepository userRepository;

    public Student getStudentDetails(String registration){

        if(userRepository.existsByRegistration(registration)){

            User user = userRepository.findByRegistration(registration);

            Student student = new Student();

            student.setRegistration(registration);
            student.setFullName(user.getFirstName() + " " + user.getLastName());
            student.setCourseName
                    (user.getEnrolledCourse().getName());

            return student;
        }
        else{

            throw new AssignmentException("No such student exists");
        }
    }

}
