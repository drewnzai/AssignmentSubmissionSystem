package com.andrew.AssignmentSubmission.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDto {

    private String title;
    private String lecturerEmail;
    private String description;
    private String unitCode;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate due;

}