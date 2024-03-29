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

    @PostMapping("/update")
    public ResponseEntity<APIResponse> update(@RequestBody SubmissionDto submissionDto){
        if(submissionService.update(submissionDto)){
            APIResponse apiResponse = APIResponse.builder()
                    .message("Submission Updated Successfully")
                    .isSuccessful(true)
                    .statusCode(201)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        } else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("Submission Does not Exist")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{assignmentTitle}")
    public List<SubmissionDto> getSubmissionsByAssignment(@PathVariable String assignmentTitle){
        return submissionService.getSubmissionsByAssignment(assignmentTitle);
    }

}
