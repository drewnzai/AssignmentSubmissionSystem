package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.Student;
import com.andrew.AssignmentSubmission.services.StudentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/student/")
@RequiredArgsConstructor
@Tag(name = "Student", description = "Student Details APIs")
public class StudentController {

    private StudentService studentService;

    @GetMapping("{registration}")
    public Student getDetails(@PathVariable String registration){
        return studentService.getStudentDetails(registration);
    }

}
