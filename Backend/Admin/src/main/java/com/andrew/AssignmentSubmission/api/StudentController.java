package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.StudentDto;
import com.andrew.AssignmentSubmission.services.StudentService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@AllArgsConstructor
@Tag(name = "Student", description = "Student Management APIs")
public class StudentController {

    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<APIResponse> addStudent(@RequestBody StudentDto studentDto) {
        if (studentService.addStudent(studentDto)) {
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

    @PostMapping("/delete")
    public ResponseEntity<APIResponse> dropStudent(@RequestBody StudentDto studentDto){
        if(studentService.deleteStudent(studentDto)){
            APIResponse apiResponse = APIResponse.builder()
                    .message("Student Dropped Successfully")
                    .isSuccessful(true)
                    .statusCode(200)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        else{

            APIResponse apiResponse = APIResponse.builder()
                    .message("Student Does Not Exist")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

}

