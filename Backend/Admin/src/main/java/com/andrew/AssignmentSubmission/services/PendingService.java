package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.repositories.AssignmentRepository;
import com.andrew.AssignmentSubmission.repositories.PendingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PendingService {

    private AssignmentRepository assignmentRepository;
    private PendingRepository pendingRepository;



}
