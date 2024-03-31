package com.andrew.AssignmentSubmission.configs;

import com.andrew.AssignmentSubmission.utils.JwtFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;


    public final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request.requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/swagger-ui.html").permitAll()
                        .requestMatchers("/api/course/**").hasAnyRole("LECTURER", "ADMIN")
                        .requestMatchers("/api/course").hasRole("ADMIN")
                        .requestMatchers("/api/lecturer").hasAnyRole("LECTURER", "ADMIN")
                        .requestMatchers("/api/student").hasRole("ADMIN")
                        .requestMatchers("/api/submission/**").hasRole("LECTURER")
                        .requestMatchers("/api/unit").hasRole("ADMIN")
                        .requestMatchers("/api/unit/**").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider).addFilterBefore(
                        jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}