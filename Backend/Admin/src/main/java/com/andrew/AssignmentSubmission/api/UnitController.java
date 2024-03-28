package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.UnitDto;
import com.andrew.AssignmentSubmission.services.UnitService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/unit")
@AllArgsConstructor
public class UnitController {

    private UnitService unitService;

    @PostMapping
    public ResponseEntity<APIResponse> addUnit(@RequestBody UnitDto unitDto){
        if(unitService.addUnit(unitDto)){
            APIResponse apiResponse = APIResponse.builder()
                    .message("Unit Added Successfully")
                    .isSuccessful(true)
                    .statusCode(201)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        } else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("Unit Already Exists or A field is wrong")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping
    public ResponseEntity<APIResponse> deleteUnit(@RequestBody UnitDto unitDto){
        if(unitService.deleteUnit(unitDto)){
            APIResponse apiResponse = APIResponse.builder()
                    .message("Unit Deleted Successfully")
                    .isSuccessful(true)
                    .statusCode(200)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        else{

            APIResponse apiResponse = APIResponse.builder()
                    .message("Unit Does Not Exist")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }
}