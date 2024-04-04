package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.DetailsRequest;
import com.andrew.AssignmentSubmission.dto.Student;
import com.andrew.AssignmentSubmission.services.StudentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
@AllArgsConstructor
@Tag(name = "Student", description = "Student Details APIs")
public class StudentController {

    private StudentService studentService;

    @GetMapping()
    public Student getDetails(@RequestBody DetailsRequest detailsRequest){
        return studentService.getStudentDetails(detailsRequest.getRegistration());
    }

}
