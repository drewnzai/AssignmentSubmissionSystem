package com.andrew.AssignmentSubmission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnitDto {

    private String name;
    private String description;
    private String code;
    private int credits;
    private String semester;
    private String lecturerEmail;

}
