package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.SubmissionDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Student;
import com.andrew.AssignmentSubmission.models.Submission;
import com.andrew.AssignmentSubmission.repositories.AssignmentRepository;
import com.andrew.AssignmentSubmission.repositories.StudentRepository;
import com.andrew.AssignmentSubmission.repositories.SubmissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Year;
import java.time.ZoneId;

@Service
@AllArgsConstructor
public class SubmissionService {

    private SubmissionRepository submissionRepository;
    private AssignmentRepository assignmentRepository;
    private AmazonService amazonService;
    private StudentRepository studentRepository;


    public boolean submit(SubmissionDto submissionDto, MultipartFile multipartFile) throws IOException {

        if(!assignmentRepository.existsByTitle(submissionDto.getAssignmentTitle())
        || !studentRepository.existsByRegistration(submissionDto.getStudentRegistration())){

            throw new AssignmentException("Assignment or User details are wrong");

        }
        else if(LocalDate.now().isAfter(
                assignmentRepository.findByTitle(submissionDto.getAssignmentTitle()).getDue()
        )){
              throw new AssignmentException("Assignment is overdue");
        }
        else{

            Submission submission = new Submission();

            Assignment assignment = assignmentRepository.findByTitle(submissionDto.getAssignmentTitle());
            Student student = studentRepository.findByRegistration(submissionDto.getStudentRegistration());

            String fullName = student.getFirstName() + " " + student.getLastName();

            int year = Year.now(ZoneId.systemDefault()).getValue();

            String path = year + "/" + submissionDto.getUnitCode() + "/" + submissionDto.getAssignmentTitle()
                    + "/" + fullName + "/";

            submission.setAssignment(assignment);
            submission.setPath(path);
            submission.setAccepted(false);
            submission.setScore(0);
            submission.setStudent(student);
            submission.setFeedback("");
            submission.setSubmissionDate(LocalDate.now());



            amazonService.save(multipartFile, path);

            submissionRepository.save(submission);

            return true;
        }
    }

    public boolean update(SubmissionDto submissionDto){
        Assignment assignment = assignmentRepository
                .findByTitle(submissionDto.getAssignmentTitle());

        Student student = studentRepository
                .findByRegistration(submissionDto.getStudentRegistration());

        if
        (submissionRepository.existsByAssignmentAndStudent(assignment, student)
        ){

            Submission submission = submissionRepository
                    .findSubmissionByAssignmentAndStudent(assignment, student);

            submission.setAccepted(submissionDto.isAccepted());
            submission.setScore(submissionDto.getScore());
            submission.setFeedback(submissionDto.getFeedback());

            submissionRepository.save(submission);

            return true;


        }else{
            throw new AssignmentException("Submission does not exist");
        }
    }


}
