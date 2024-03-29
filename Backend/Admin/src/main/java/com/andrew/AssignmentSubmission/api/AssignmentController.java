package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.services.AssignmentService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignment")
@AllArgsConstructor
public class AssignmentController {

    private AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<APIResponse> addAssignment(@RequestBody AssignmentDto assignmentDto){
        if(assignmentService.addAssignment(assignmentDto)){
            APIResponse apiResponse = APIResponse.builder()
                    .message("Assignment Created Successfully")
                    .isSuccessful(true)
                    .statusCode(201)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        }
        else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("The Assignment Details Either Exist or Are Incorrect")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping
    public ResponseEntity<APIResponse> deleteAssignment(@RequestBody AssignmentDto assignmentDto){
        if(assignmentService.deleteAssignment(assignmentDto)){

            APIResponse apiResponse = APIResponse.builder()
                    .message("Assignment Deleted Successfully")
                    .isSuccessful(true)
                    .statusCode(200)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("The Assignment Doesn't Exist")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{unitCode}")
    public List<AssignmentDto> getPendingAssignmentsByUnit(@PathVariable String unitCode){
        return assignmentService.pendingAssignmentsByUnit(unitCode);
    }
}
