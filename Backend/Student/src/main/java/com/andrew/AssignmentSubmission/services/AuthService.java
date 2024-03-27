package com.andrew.AssignmentSubmission.services;


import com.andrew.AssignmentSubmission.dto.LoginRequest;
import com.andrew.AssignmentSubmission.dto.LoginResponse;
import com.andrew.AssignmentSubmission.dto.RefreshTokenRequest;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.models.UserDetailsImpl;
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
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return userRepository.findByRegistration(principal.getUsername());
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getRegistration(),
                loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String token = jwtUtil.generateJwtToken(authenticate);
        return LoginResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                .expiresAt(Instant.now().plusSeconds(jwtUtil.getJwtExpiration()))
                .username(loginRequest.getRegistration())
                .build();
    }

    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtUtil.generateTokenFromUsername(refreshTokenRequest.getUsername());
        return LoginResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(Instant.now().plusSeconds(jwtUtil.getJwtExpiration()))
                .username(refreshTokenRequest.getUsername())
                .build();
    }

    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    }

}
