package com.andrew.AssignmentSubmission.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class APIResponse {
    private String message;
    private int statusCode;
    private Object data;
}