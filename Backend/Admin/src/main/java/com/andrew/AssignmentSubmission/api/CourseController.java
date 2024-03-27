package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.CourseDto;
import com.andrew.AssignmentSubmission.services.CourseService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
@AllArgsConstructor
public class CourseController {

    private CourseService courseService;

    @PostMapping
    public ResponseEntity<APIResponse> addCourse(@RequestBody CourseDto courseDto){
        if(courseService.addCourse(courseDto.getName())){
            APIResponse apiResponse = APIResponse.builder()
                    .message("Course Added Successfully")
                    .isSuccessful(true)
                    .statusCode(201)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        }
        else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("The Course Already Exists")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping
    public ResponseEntity<APIResponse> deleteCourse(@RequestBody CourseDto courseDto){
        if(courseService.deleteCourse(courseDto.getName())){

            APIResponse apiResponse = APIResponse.builder()
                    .message("Course Deleted Successfully")
                    .isSuccessful(true)
                    .statusCode(200)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("The Course Doesn't Exist")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/batch")
    public ResponseEntity<APIResponse> batch(@RequestBody List<CourseDto> courses){

        for(CourseDto courseDto: courses){
            courseService.addCourse(courseDto.getName());
        }

        APIResponse apiResponse = APIResponse.builder()
                .message("Student Registration Successful")
                .isSuccessful(true)
                .statusCode(201)
                .build();

        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

}
