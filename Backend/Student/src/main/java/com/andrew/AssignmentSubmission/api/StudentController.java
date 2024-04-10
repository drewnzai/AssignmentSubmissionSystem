package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.MiscRequest;
import com.andrew.AssignmentSubmission.dto.Student;
import com.andrew.AssignmentSubmission.services.StudentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@AllArgsConstructor
@Tag(name = "Student", description = "Student Details APIs")
public class StudentController {

    private StudentService studentService;

    @PostMapping
    public Student getDetails(@RequestBody MiscRequest miscRequest){
        return studentService.getStudentDetails(miscRequest.getData());
    }

}
