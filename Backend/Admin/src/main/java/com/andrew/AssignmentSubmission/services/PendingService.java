package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.models.Pending;
import com.andrew.AssignmentSubmission.models.Student;
import com.andrew.AssignmentSubmission.repositories.*;
import lombok.AllArgsConstructor;
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

    public void deletePending(String title){

        pendingRepository.deleteAll(pendingRepository.findAllByTitle(title));
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
