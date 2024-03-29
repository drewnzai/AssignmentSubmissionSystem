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
    private UserRepository userRepository;
    private UnitRepository unitRepository;

    public boolean addAssignment(AssignmentDto assignmentDto){

        if(assignmentRepository.existsByTitle(assignmentDto.getTitle())
        || !userRepository.existsByEmail(assignmentDto.getLecturerEmail())
        || !unitRepository.existsByCode(assignmentDto.getUnitCode())){
            throw new AssignmentException("The assignment already exists, or the user or unit does not exist");
        }
        else{

            Unit unit  = unitRepository.findByCode(assignmentDto.getUnitCode());
            User lecturer  = userRepository.findByEmail(assignmentDto.getLecturerEmail());

            Assignment assignment = new Assignment();

            assignment.setDescription(assignmentDto.getDescription());
            assignment.setTitle(assignmentDto.getTitle());
            assignment.setUnit(unit);
            assignment.setDue(assignmentDto.getDue());
            assignment.setLecturer(lecturer);

            assignmentRepository.save(assignment);

            return true;
        }
    }

    public boolean deleteAssignment(AssignmentDto assignmentDto){
        if(assignmentRepository.existsByTitle(assignmentDto.getTitle())
                || userRepository.existsByEmail(assignmentDto.getLecturerEmail())
                || unitRepository.existsByCode(assignmentDto.getUnitCode())){

            Assignment assignment = assignmentRepository.findByTitle(assignmentDto.getTitle());

            assignmentRepository.delete(assignment);

            return true;
        }
        else{
            throw new AssignmentException("The assignment, user, or unit does not exist");
        }
    }

    public List<AssignmentDto> getAssignmentsFromLecturer(String email){
        if (userRepository.existsByEmail(email)){

            User user  = userRepository.findByEmail(email);

            List<Assignment> assignments = assignmentRepository.findAllByLecturer(user);
            List<AssignmentDto> assignmentDtos = new ArrayList<>();

            for(Assignment assignment: assignments){

                AssignmentDto assignmentDto = new AssignmentDto();

                assignmentDto.setTitle(assignment.getTitle());
                assignmentDto.setDescription(assignment.getDescription());
                assignmentDto.setLecturerEmail(user.getEmail());
                assignmentDto.setDue(assignment.getDue());
                assignmentDto.setUnitCode(assignment.getUnit().getCode());

                assignmentDtos.add(assignmentDto);
            }
            return assignmentDtos;
        }
        else{
            throw new AssignmentException("User with email " + email + " does not exist");
        }
    }

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
