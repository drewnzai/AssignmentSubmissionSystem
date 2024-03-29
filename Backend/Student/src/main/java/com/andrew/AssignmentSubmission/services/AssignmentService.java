package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.AssignmentRepository;
import com.andrew.AssignmentSubmission.repositories.UnitRepository;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
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
    public List<AssignmentDto> pendingAssignmentsByUnit(String unitCode){

        Unit unit = unitRepository.findByCode(unitCode);

        List<Assignment> assignments = assignmentRepository.findAllByUnit(unit);

        List<AssignmentDto> pendingAssignments = new ArrayList<>();

        for(Assignment assignment: assignments){

            if(LocalDate.now().isBefore(assignment.getDue())){

                AssignmentDto assignmentDto = new AssignmentDto();

                assignmentDto.setUnitCode(unitCode);
                assignmentDto.setTitle(assignment.getTitle());
                assignmentDto.setDescription(assignment.getDescription());
                assignmentDto.setDue(assignment.getDue());
                assignmentDto.setLecturerEmail(assignment.getLecturer().getEmail());

                pendingAssignments.add(assignmentDto);

            }
        }
        return pendingAssignments;
    }
}
