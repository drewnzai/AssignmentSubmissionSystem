package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.dto.MiscRequest;
import com.andrew.AssignmentSubmission.dto.UnitList;
import com.andrew.AssignmentSubmission.services.AssignmentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/assignment")
@AllArgsConstructor
@Tag(name = "Assignment", description = "Assignment Management APIs")
public class AssignmentController {

    private AssignmentService assignmentService;
    @PostMapping()
    public List<AssignmentDto> getPendingAssignmentsByUnit(@RequestBody MiscRequest miscRequest){

        return assignmentService.pendingAssignments(miscRequest.getData());
    }
}
