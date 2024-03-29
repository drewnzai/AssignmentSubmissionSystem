package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.UnitDto;
import com.andrew.AssignmentSubmission.services.UnitService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/unit")
@AllArgsConstructor
public class UnitController {

    private UnitService unitService;

    @GetMapping("/{courseName}")
    public List<UnitDto> getUnitsFromCourse(@PathVariable String courseName){
        return unitService.getCurrentUnitsFromCourse(courseName);
    }

}
