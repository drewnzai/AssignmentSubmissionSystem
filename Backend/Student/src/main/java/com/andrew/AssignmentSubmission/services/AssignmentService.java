package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.repositories.AssignmentRepository;
import com.andrew.AssignmentSubmission.repositories.UnitRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AssignmentService {

    public List<AssignmentDto> pendingAssignments(String registration) {

        List<AssignmentDto> pendingAssignments = new ArrayList<>();



        return pendingAssignments;
    }
}
