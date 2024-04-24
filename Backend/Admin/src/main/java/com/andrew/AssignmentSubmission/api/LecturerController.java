package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.Assigned;
import com.andrew.AssignmentSubmission.dto.LecturerRequest;
import com.andrew.AssignmentSubmission.dto.UserDto;
import com.andrew.AssignmentSubmission.services.UserService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lecturer")
@AllArgsConstructor
@Tag(name = "Lecturer", description = "Lecturer Management APIs")
public class LecturerController {

    private UserService userService;

    //Using "@RequestBody String email" prevents the code from working correctly
    //Plain JSON strings are not decoded properly hence the need for userDTO, a top-level container
    @PostMapping
    public Assigned getLecturerDetails(@RequestBody UserDto userDto){
        return userService.getAssignedUnits(userDto.getEmail());
    }

    @PostMapping("/add")
    public ResponseEntity<APIResponse> addLecturer(@RequestBody LecturerRequest lecturer){
        if(userService.addLecturer(lecturer)){
            APIResponse apiResponse = APIResponse.builder()
                    .message("Lecturer Added Successfully")
                    .isSuccessful(true)
                    .statusCode(201)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        } else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("Lecturer Already Exists or A field is wrong")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<APIResponse> deleteLecturer(@RequestBody LecturerRequest lecturer){
        if(userService.deleteLecturer(lecturer)){
        APIResponse apiResponse = APIResponse.builder()
                .message("Lecturer Deleted Successfully")
                .isSuccessful(true)
                .statusCode(200)
                .build();

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
    else{

        APIResponse apiResponse = APIResponse.builder()
                .message("Lecturer Does Not Exist")
                .isSuccessful(false)
                .statusCode(409)
                .build();

        return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
    }
    }


}
