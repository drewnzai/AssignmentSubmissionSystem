package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.Student;
import com.andrew.AssignmentSubmission.services.StudentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/")
@RequiredArgsConstructor
@Tag(name = "Student", description = "Student Details APIs")
public class StudentController {

    private StudentService studentService;

    @GetMapping()
    public Student getDetails(@RequestBody String registration){
        return studentService.getStudentDetails(registration);
    }

}
