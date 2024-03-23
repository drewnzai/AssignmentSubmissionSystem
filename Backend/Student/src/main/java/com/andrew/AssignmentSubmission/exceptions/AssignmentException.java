package com.andrew.AssignmentSubmission.exceptions;

public class AssignmentException extends RuntimeException {
    public AssignmentException(String exMessage, Exception exception) {
        super(exMessage, exception);
    }

    public AssignmentException(String exMessage) {
        super(exMessage);
    }
}