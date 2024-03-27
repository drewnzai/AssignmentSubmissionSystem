package com.andrew.AssignmentSubmission.services;


import com.andrew.AssignmentSubmission.dto.LoginRequest;
import com.andrew.AssignmentSubmission.dto.LoginResponse;
import com.andrew.AssignmentSubmission.dto.RefreshTokenRequest;
import com.andrew.AssignmentSubmission.dto.RegisterRequest;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Role;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.models.UserDetailsImpl;
import com.andrew.AssignmentSubmission.repositories.RoleRepository;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
import com.andrew.AssignmentSubmission.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public boolean signup(RegisterRequest registerRequest) {
        String email =
                registerRequest.getFirstName()
                        + "." +
                        registerRequest.getLastName()
                        + "@egerton.ac.ke";

        if(userRepository.existsByEmail(email)){
            return false;
        }
        else {

            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setCreated(Instant.now());
            user.setEnabled(true);
            Role role = roleRepository.findByName(registerRequest.getRole())
                    .orElseThrow(() -> new AssignmentException("No such Role"));

            user.setRole(role);

            userRepository.save(user);

            return true;

        }

    }


    @Transactional(readOnly = true)
    public User getCurrentUser() {
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(principal.getEmail());
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String token = jwtUtil.generateJwtToken(authenticate);
        return LoginResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                .expiresAt(Instant.now().plusSeconds(jwtUtil.getJwtExpiration()))
                .email(loginRequest.getEmail())
                .build();
    }

    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtUtil.generateTokenFromEmail(refreshTokenRequest.getEmail());
        return LoginResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(Instant.now().plusSeconds(jwtUtil.getJwtExpiration()))
                .email(refreshTokenRequest.getEmail())
                .build();
    }

    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    }

}
