package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.StudentDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.models.Student;
import com.andrew.AssignmentSubmission.repositories.CourseRepository;
import com.andrew.AssignmentSubmission.repositories.StudentRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository studentRepository;
    private CourseRepository courseRepository;

    public boolean addStudent(StudentDto studentDto){
        if
        (studentRepository.existsByRegistration(studentDto.getRegistration())){
            return false;
        }
        else{

            Student student = new Student();
            Course course = courseRepository.findByName(studentDto.getCourseName())
                            .orElseThrow(
                                    () -> new AssignmentException("No Such Course")
                            );

            student.setFirstName(studentDto.getFirstName());
            student.setLastName(studentDto.getLastName());
            student.setEmail(studentDto.getFirstName().toLowerCase()
                    + "." +
                    studentDto.getLastName().toLowerCase()
                    + "@egerton.ac.ke");
            student.setPassword(studentDto.getFirstName() + studentDto.getLastName());
            student.setRegistration(studentDto.getRegistration());
            student.setEnrolledCourse(course);
            student.setCreated(Instant.now());
            student.setEnabled(true);

            studentRepository.save(student);

            return true;

        }
    }

    public boolean deleteStudent(StudentDto studentDto) {
        if
        (studentRepository.existsByRegistration(studentDto.getRegistration())) {

           studentRepository.delete(studentRepository
                   .findByRegistration(studentDto.getRegistration()));

            return true;

        } else {

            return false;
        }
    }

}
