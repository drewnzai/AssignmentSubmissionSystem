package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.dto.MiscRequest;
import com.andrew.AssignmentSubmission.services.PendingAssignmentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/assignment")
@AllArgsConstructor
@Tag(name = "Assignment", description = "Assignment Management APIs")
public class AssignmentController {

    private PendingAssignmentService pendingAssignmentService;
    @PostMapping()
    public List<AssignmentDto> getPendingAssignments(@RequestBody MiscRequest miscRequest){

        return pendingAssignmentService.pendingAssignments(miscRequest.getData());
    }

    @PostMapping("/unit")
    public List<AssignmentDto> getPendingAssignmentsByUnit(@RequestBody MiscRequest miscRequest){
        return pendingAssignmentService.getAllPendingsFromUnit(miscRequest.getData());
    }
}
