package com.andrew.AssignmentSubmission.dto;

import lombok.Data;

@Data
public class StudentRegisterRequest {
    private String firstName;
    private String lastName;
    private String registration;
    private String courseName;
}
