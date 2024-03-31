package com.andrew.AssignmentSubmission.api;

import com.andrew.AssignmentSubmission.dto.LoginRequest;
import com.andrew.AssignmentSubmission.dto.LoginResponse;
import com.andrew.AssignmentSubmission.dto.RefreshTokenRequest;
import com.andrew.AssignmentSubmission.dto.RegisterRequest;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
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

import java.util.List;

@RestController
@RequestMapping("/api/auth/")
@AllArgsConstructor
@Tag(name = "Auth", description = "User Access and Management APIs")
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("signup")
    public ResponseEntity<APIResponse> signup(@RequestBody RegisterRequest registerRequest) {
        if(authService.signup(registerRequest)){

            APIResponse apiResponse = APIResponse.builder()
                    .message("User Registration Successful")
                    .isSuccessful(true)
                    .statusCode(201)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);

        }else {

            APIResponse apiResponse = APIResponse.builder()
                    .message("User Already Exists")
                    .isSuccessful(false)
                    .statusCode(409)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
        }
    }

    @PostMapping("batch")
    public String batchSignup(@RequestBody List<RegisterRequest> registerRequests){
        for (RegisterRequest registerRequest: registerRequests){
            authService.signup(registerRequest);
        }
        return "OK";
    }
    @PostMapping("login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {

        if(authService.isLoggedIn()){
            throw new AssignmentException("Already logged in");
        }
        else {
            return authService.login(loginRequest);
        }
    }

    @PostMapping("refresh/token")
    public ResponseEntity<APIResponse> refreshTokens(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {

        APIResponse apiResponse = APIResponse.builder()
                .message("Successful login")
                .isSuccessful(true)
                .statusCode(200)
                .data(authService.refreshToken(refreshTokenRequest))
                .build();

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);

    }

    @PostMapping("logout")
    public ResponseEntity<APIResponse> logout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());

        APIResponse apiResponse = APIResponse.builder()
                .message("User logged out successfully")
                .isSuccessful(true)
                .statusCode(200)
                .build();

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}