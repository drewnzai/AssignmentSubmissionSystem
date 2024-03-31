package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.Assigned;
import com.andrew.AssignmentSubmission.dto.UserDto;
import com.andrew.AssignmentSubmission.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lecturer")
@AllArgsConstructor
@Tag(name = "Assigned units", description = "Lecturer Assigned Units Management APIs")
public class LecturerController {

    private UserService userService;

    //Using "@RequestBody String email" prevents the code from working correctly
    //Plain JSON strings are not decoded properly hence the need for userDTO, a top-level container
    @GetMapping
    public Assigned getLecturerDetails(@RequestBody UserDto userDto){
        return userService.getAssignedUnits(userDto.getEmail());
    }


}
