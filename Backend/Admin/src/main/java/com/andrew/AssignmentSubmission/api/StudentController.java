package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.StudentRegisterRequest;
import com.andrew.AssignmentSubmission.services.StudentService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/student/")
@AllArgsConstructor
public class StudentController {

    private StudentService studentService;

    @PostMapping
    public ResponseEntity<APIResponse> addStudent(@RequestBody StudentRegisterRequest registerRequest) {
        if (studentService.addStudent(registerRequest)) {
            APIResponse apiResponse = APIResponse.builder()
                    .message("Student Registration Successful")
                    .isSuccessful(true)
                    .statusCode(201)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        } else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("Student Already Exists or The Course Does Not Exist")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }


}
