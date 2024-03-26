package com.andrew.AssignmentSubmission.repositories;

import com.andrew.AssignmentSubmission.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByRegistration(String registration);

    Boolean existsByRegistration(String registration);



}
