package com.andrew.AssignmentSubmission.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

import static jakarta.persistence.GenerationType.IDENTITY;

@Data
@Table(name = "students")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long studentId;

    @NotBlank(message = "Username is required")
    private String registration;

    private String firstName;
    private String lastName;
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private Instant created;

    private boolean enabled;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course enrolledCourse;

}
