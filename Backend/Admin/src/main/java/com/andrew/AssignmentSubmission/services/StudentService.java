package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.StudentDetails;
import com.andrew.AssignmentSubmission.dto.StudentDto;
import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.models.Student;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.CourseRepository;
import com.andrew.AssignmentSubmission.repositories.StudentRepository;
import com.andrew.AssignmentSubmission.repositories.SubmissionRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository studentRepository;
    private CourseRepository courseRepository;
    private SubmissionRepository submissionRepository;
    private final PasswordEncoder passwordEncoder;

    private AuthService authService;

    private static final Logger logger = LoggerFactory.getLogger(StudentService.class);


    public boolean addStudent(StudentDto studentDto){
        if
        (studentRepository.existsByRegistration(studentDto.getRegistration())){
            return false;
        }
        else{

            Student student = new Student();
            Course course = courseRepository.findByName(studentDto.getCourseName());

            student.setFirstName(studentDto.getFirstName());
            student.setLastName(studentDto.getLastName());
            student.setEmail(studentDto.getFirstName().toLowerCase()
                    + "." +
                    studentDto.getLastName().toLowerCase()
                    + "@egerton.ac.ke");
            student.setPassword
                    (passwordEncoder
                            .encode
                                    (studentDto.getFirstName()));
            student.setRegistration(studentDto.getRegistration());
            student.setEnrolledCourse(course);
            student.setCreated(Instant.now());
            student.setEnabled(true);

            studentRepository.save(student);

            logger.info(authService.getCurrentUser().getEmail() + " created student: " + student.getEmail());

            return true;

        }
    }

    public boolean deleteStudent(StudentDto studentDto) {
        if
        (studentRepository.existsByRegistration(studentDto.getRegistration())) {

            Student student = studentRepository
                    .findByRegistration(studentDto.getRegistration());

            submissionRepository.deleteAll(submissionRepository.findAllByStudent(student));

            studentRepository.delete(student);

            logger.info(authService.getCurrentUser().getEmail() + " dropped student: " + student.getEmail());
            return true;

        } else {

            return false;
        }
    }

    public List<StudentDetails> getAllStudents(){
        List<StudentDetails> students = new ArrayList<>();

        for(Student student: studentRepository.findAll()){
            StudentDetails studentDetails = new StudentDetails();

            studentDetails.setId(student.getStudentId().intValue());
            studentDetails.setRegistration(student.getRegistration());
            studentDetails.setFullName(
                    student.getFirstName() + " " + student.getLastName()
            );

            students.add(studentDetails);
        }
        return students;
    }

}
