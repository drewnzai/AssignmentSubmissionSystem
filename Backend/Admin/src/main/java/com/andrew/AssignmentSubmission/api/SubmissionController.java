package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.MiscRequest;
import com.andrew.AssignmentSubmission.dto.SubmissionDto;
import com.andrew.AssignmentSubmission.services.SubmissionService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/submission")
@AllArgsConstructor
@Tag(name = "Submission", description = "Submission Management APIs")
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

    @PostMapping("/lecturer")
    public List<SubmissionDto> getAllSubmissions(@RequestBody MiscRequest miscRequest){
        return submissionService.getAllSubmissions(miscRequest.getData());
    }

    @PostMapping("/assignment")
    public List<SubmissionDto> getAllSubmissionsFromAssignment(@RequestBody MiscRequest miscRequest){
        return submissionService.getSubmissionsByAssignmentTitle(miscRequest.getData());
    }

}
