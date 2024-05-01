package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.*;
import com.andrew.AssignmentSubmission.repositories.*;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private PendingRepository pendingRepository;
    private SubmissionRepository submissionRepository;
    private PendingService pendingService;
    private AuthService authService;


    private static final Logger logger = LoggerFactory.getLogger(AssignmentService.class);

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

            logger.info(authService.getCurrentUser().getEmail() + " created assignment: " + assignment.getTitle());
            assignmentRepository.save(assignment);

            pendingService.populate(assignment);

            return true;
        }
    }

    public boolean deleteAssignment(String title){
        if(assignmentRepository.existsByTitle(title)){

            Assignment assignment = assignmentRepository.findByTitle(title);

            submissionRepository.deleteAll(submissionRepository.findAllByAssignment(assignment));
            pendingRepository.deleteAll(pendingRepository.findAllByTitle(title));
            assignmentRepository.delete(assignment);

            logger.info(authService.getCurrentUser().getEmail() + " deleted assignment: " + assignment.getTitle());
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
