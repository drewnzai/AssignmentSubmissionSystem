package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.models.UserDetailsImpl;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        return new UserDetailsImpl(user);
    }

}
