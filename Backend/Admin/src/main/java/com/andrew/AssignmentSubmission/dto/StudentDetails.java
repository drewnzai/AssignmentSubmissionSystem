package com.andrew.AssignmentSubmission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDetails {

    private int id;
    private String fullName;
    private String registration;
    private String courseName;
}
