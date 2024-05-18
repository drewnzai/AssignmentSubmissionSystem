package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.SubmissionDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Student;
import com.andrew.AssignmentSubmission.models.Submission;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.AssignmentRepository;
import com.andrew.AssignmentSubmission.repositories.StudentRepository;
import com.andrew.AssignmentSubmission.repositories.SubmissionRepository;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class SubmissionService {

    private SubmissionRepository submissionRepository;
    private AssignmentRepository assignmentRepository;
    private StudentRepository studentRepository;
    private UserRepository userRepository;

    private AuthService authService;

    private static final Logger logger = LoggerFactory.getLogger(SubmissionService.class);


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

            logger.info(authService.getCurrentUser().getEmail()
                    + " modified the submission by student "
                    + student.getRegistration());

            return true;


        }else{
            throw new AssignmentException("Submission does not exist");
        }
    }

    public List<SubmissionDto> getAllSubmissions(String email){

        List<SubmissionDto> submissionDtos = new ArrayList<>();

        User lecturer = userRepository.findByEmail(email);

        List<Assignment> assignments = assignmentRepository.findAllByLecturer(lecturer);

        for(Assignment assignment: assignments) {

            List<Submission> submissions = submissionRepository.findAllByAssignment(assignment);

            for (Submission submission : submissions) {

                    SubmissionDto submissionDto = new SubmissionDto();

                    submissionDto.setAssignmentTitle(assignment.getTitle());
                    submissionDto.setFeedback(submission.getFeedback());
                    submissionDto.setStudentRegistration(submission.getStudent().getRegistration());
                    submissionDto.setUnitCode(assignment.getUnit().getCode());
                    submissionDto.setScore(submission.getScore());
                    submissionDto.setAccepted(submission.isAccepted());
                    submissionDto.setPath(submission.getPath());

                    submissionDtos.add(submissionDto);

            }
        }

        return submissionDtos;
    }

    public List<SubmissionDto> getSubmissionsByAssignmentTitle(String assignmentTitle){
        List<SubmissionDto> submissions = new ArrayList<>();

        Assignment assignment = assignmentRepository.findByTitle(assignmentTitle);

        for (Submission submission : submissionRepository.findAllByAssignment(assignment)) {

            SubmissionDto submissionDto = new SubmissionDto();

            submissionDto.setAssignmentTitle(assignment.getTitle());
            submissionDto.setFeedback(submission.getFeedback());
            submissionDto.setStudentRegistration(submission.getStudent().getRegistration());
            submissionDto.setUnitCode(assignment.getUnit().getCode());
            submissionDto.setScore(submission.getScore());
            submissionDto.setAccepted(submission.isAccepted());
            submissionDto.setPath(submission.getPath());

            submissions.add(submissionDto);

        }

        return submissions;
    }

}
