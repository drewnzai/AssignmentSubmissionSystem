package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Pending;
import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.repositories.AssignmentRepository;
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
public class AssignmentService {

    private PendingRepository pendingRepository;
    private UserRepository userRepository;

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
