package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.Assigned;
import com.andrew.AssignmentSubmission.dto.UserDto;
import com.andrew.AssignmentSubmission.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lecturer")
@AllArgsConstructor
@Tag(name = "Assigned units", description = "Lecturer Assigned Units Management APIs")
public class LecturerController {

    private UserService userService;

    //Using "@RequestBody String email" prevents the code from working correctly
    //Plain JSON strings are not decoded properly hence the need for userDTO, a top-level container
    @PostMapping
    public Assigned getLecturerDetails(@RequestBody UserDto userDto){
        return userService.getAssignedUnits(userDto.getEmail());
    }


}
