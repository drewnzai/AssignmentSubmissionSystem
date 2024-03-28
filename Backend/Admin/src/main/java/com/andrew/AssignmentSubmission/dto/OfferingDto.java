package com.andrew.AssignmentSubmission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OfferingDto {

    private String unitName;
    private List<String> courses;

}
