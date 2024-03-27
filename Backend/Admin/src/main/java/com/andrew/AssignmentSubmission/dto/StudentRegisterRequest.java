package com.andrew.AssignmentSubmission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentRegisterRequest {
    private String firstName;
    private String lastName;
    private String registration;
    private String courseName;
}
