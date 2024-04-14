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

    private AssignmentRepository assignmentRepository;
    private UnitRepository unitRepository;
    public List<AssignmentDto> pendingAssignmentsByUnit(List<String> units) {

        List<AssignmentDto> pendingAssignments = new ArrayList<>();

        for (String unitCode : units) {

            Unit unit = unitRepository.findByCode(unitCode);

            List<Assignment> assignments = assignmentRepository.findAllByUnit(unit);

            for (Assignment assignment : assignments) {

                if (LocalDate.now().isBefore(assignment.getDue())) {

                    AssignmentDto assignmentDto = new AssignmentDto();

                    assignmentDto.setUnitCode(unitCode);
                    assignmentDto.setTitle(assignment.getTitle());
                    assignmentDto.setDescription(assignment.getDescription());
                    assignmentDto.setDue(assignment.getDue());
                    assignmentDto.setLecturerEmail(assignment.getLecturer().getEmail());

                    pendingAssignments.add(assignmentDto);

                }
            }

        }
        return pendingAssignments;
    }
}
