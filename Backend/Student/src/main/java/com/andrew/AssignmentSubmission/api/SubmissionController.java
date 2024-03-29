package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.SubmissionDto;
import com.andrew.AssignmentSubmission.services.SubmissionService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/submission")
@AllArgsConstructor
public class SubmissionController {

    private SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<APIResponse>
    submit(@RequestParam("assignmentTitle") String assignmentTitle,
           @RequestParam("studentRegistration") String studentRegistration,
           @RequestParam("unitCode") String unitCode,
           @RequestParam("file") MultipartFile file)
            throws IOException {

        SubmissionDto submissionDto = new SubmissionDto();
        submissionDto.setAssignmentTitle(assignmentTitle);
        submissionDto.setUnitCode(unitCode);
        submissionDto.setStudentRegistration(studentRegistration);

        if(submissionService.submit(submissionDto, file)){
            APIResponse apiResponse = APIResponse.builder()
                    .message("Submitted successfully")
                    .isSuccessful(true)
                    .statusCode(201)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        } else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("Submission failed")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }
}
