package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.AssignmentDto;
import com.andrew.AssignmentSubmission.models.*;
import com.andrew.AssignmentSubmission.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class PendingService {

    private AssignmentRepository assignmentRepository;
    private PendingRepository pendingRepository;
    private CourseRepository courseRepository;
    private OfferingRepository offeringRepository;
    private StudentRepository studentRepository;

    @Async
    public void populate(Assignment assignment){

        Course course = offeringRepository
                .findByUnit(assignment.getUnit()).getCourse();

        List<Student> students = studentRepository.findAllByEnrolledCourse(course);

        for (Student student: students){

            Pending pending = new Pending();

            pending.setDue(assignment.getDue());
            pending.setDescription(assignment.getDescription());
            pending.setTitle(assignment.getTitle());
            pending.setUnit(assignment.getUnit());
            pending.setStudent(student);

            pendingRepository.save(pending);
        }

    }

    public void deletePending(AssignmentDto assignmentDto){
        List<Pending> pendings = pendingRepository.findAllByTitle(assignmentDto.getTitle());

        pendingRepository.deleteAll(pendings);
    }

    @Scheduled(cron = "0 0 0 * * ?")
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
