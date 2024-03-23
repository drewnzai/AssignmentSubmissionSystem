package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByRegistration(String username);

    Boolean existsByRegistration(String username);



}
