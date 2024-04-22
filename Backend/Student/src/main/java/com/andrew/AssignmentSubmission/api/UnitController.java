package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.MiscRequest;
import com.andrew.AssignmentSubmission.dto.UnitDto;
import com.andrew.AssignmentSubmission.services.UnitService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/unit")
@AllArgsConstructor
@Tag(name = "Unit", description = "Unit Management APIs")
public class UnitController {

    private UnitService unitService;

    @PostMapping()
    public List<UnitDto> getUnitsFromCourse(@RequestBody MiscRequest miscRequest){
        return unitService.getCurrentUnitsFromCourse(miscRequest.getData());
    }

}
