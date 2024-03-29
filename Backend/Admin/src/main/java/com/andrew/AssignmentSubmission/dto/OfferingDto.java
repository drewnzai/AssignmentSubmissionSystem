package com.andrew.AssignmentSubmission.dto;

import com.andrew.AssignmentSubmission.models.Unit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OfferingDto {

    private List<UnitDto> units;
    private List<CourseDto> courses;


}
