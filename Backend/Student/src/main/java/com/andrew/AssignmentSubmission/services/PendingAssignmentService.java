package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.models.Pending;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.PendingRepository;
import com.andrew.AssignmentSubmission.repositories.UnitRepository;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PendingAssignmentService {

    private PendingRepository pendingRepository;
    private UnitRepository unitRepository;
    private UserRepository userRepository;

    private AuthService authService;

    public List<AssignmentDto> pendingAssignments(String registration) {

        List<AssignmentDto> pendingAssignments = new ArrayList<>();

        List<Pending> assignments = pendingRepository
                .findAllByUser(userRepository
                        .findByRegistration(registration));

        for(Pending pending: assignments){
            AssignmentDto assignmentDto = new AssignmentDto();

            assignmentDto.setDescription(pending.getDescription());
            assignmentDto.setDue(pending.getDue());
            assignmentDto.setLecturerEmail("");
            assignmentDto.setTitle(pending.getTitle());
            assignmentDto.setUnitCode(pending.getUnit().getCode());

            pendingAssignments.add(assignmentDto);
        }


        return pendingAssignments;
    }

    public List<AssignmentDto> getAllPendingsFromUnit(String unitCode){
        List<AssignmentDto> assignments = new ArrayList<>();

        User user = authService.getCurrentUser();

        for(Pending pending: pendingRepository.findAllByUnitAndUser
                (unitRepository.findByCode(unitCode), user)){

            AssignmentDto assignmentDto = new AssignmentDto();

            assignmentDto.setUnitCode(pending.getUnit().getCode());
            assignmentDto.setDescription(pending.getDescription());
            assignmentDto.setDue(pending.getDue());
            assignmentDto.setTitle(pending.getTitle());
            assignmentDto.setLecturerEmail("");

            assignments.add(assignmentDto);
        }

        return assignments;
    }

    @EventListener(value = ApplicationReadyEvent.class)
    public void deleteAllOverdue(){

        LocalDate localDate = LocalDate.now();

        List<Pending> pendings = pendingRepository.findAll();

        for(Pending pending: pendings){
            if(localDate.isAfter(pending.getDue())){
                pendingRepository.delete(pending);
            }
        }
    }
}
