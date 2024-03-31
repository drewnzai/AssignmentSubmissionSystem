package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.LoginRequest;
import com.andrew.AssignmentSubmission.dto.LoginResponse;
import com.andrew.AssignmentSubmission.dto.RefreshTokenRequest;
import com.andrew.AssignmentSubmission.services.AuthService;
import com.andrew.AssignmentSubmission.services.RefreshTokenService;
import com.andrew.AssignmentSubmission.utils.APIResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/")
@AllArgsConstructor
@Tag(name = "Auth", description = "Student Resource Access APIs")
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {

        return authService.login(loginRequest);
    }

    @PostMapping("refresh/token")
    public LoginResponse refreshTokens(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {

        return authService.refreshToken(refreshTokenRequest);

    }

    @PostMapping("logout")
    public ResponseEntity<APIResponse> logout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());

        APIResponse apiResponse = APIResponse.builder()
                .message("User logged out successfully")
                .statusCode(200)
                .build();

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}