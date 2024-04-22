package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.SubmissionDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Assignment;
import com.andrew.AssignmentSubmission.models.Pending;
import com.andrew.AssignmentSubmission.models.Submission;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.AssignmentRepository;
import com.andrew.AssignmentSubmission.repositories.PendingRepository;
import com.andrew.AssignmentSubmission.repositories.SubmissionRepository;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
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
    private PendingRepository pendingRepository;
    private AmazonService amazonService;
    private UserRepository userRepository;


    public boolean submit(SubmissionDto submissionDto, MultipartFile multipartFile) throws IOException {

        if(!pendingRepository.existsByTitle(submissionDto.getAssignmentTitle())
        || !userRepository.existsByRegistration(submissionDto.getStudentRegistration())){

            throw new AssignmentException("Assignment or User details are wrong");

        }
        else{

            Submission submission = new Submission();

            User student = userRepository.findByRegistration(submissionDto.getStudentRegistration());
            Pending pending = pendingRepository.findByTitleAndUser(submissionDto.getAssignmentTitle(), student);
            Assignment assignment = assignmentRepository.findByTitle(submissionDto.getAssignmentTitle());

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

            pendingRepository.delete(pending);

            return true;
        }
    }

}
