package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.services.AssignmentService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
