package com.andrew.AssignmentSubmission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionDto {

    private String assignmentTitle;
    private String studentRegistration;
    private String unitCode;
    private int score;
    private String feedback;
    private boolean accepted;

}