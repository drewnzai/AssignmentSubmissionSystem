package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.services.AssignmentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/assignment")
@AllArgsConstructor
public class AssignmentController {

    private AssignmentService assignmentService;
    @GetMapping("/{unitCode}")
    public List<AssignmentDto> getPendingAssignmentsByUnit(@PathVariable String unitCode){
        return assignmentService.pendingAssignmentsByUnit(unitCode);
    }
}
