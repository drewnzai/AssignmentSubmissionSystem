package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.UnitDto;
import com.andrew.AssignmentSubmission.services.UnitService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
