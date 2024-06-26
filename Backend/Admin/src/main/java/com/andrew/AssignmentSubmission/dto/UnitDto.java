package com.andrew.AssignmentSubmission.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

    @JsonIgnore
    private List<CourseDto> courses;

}
