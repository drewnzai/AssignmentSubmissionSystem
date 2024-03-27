package com.andrew.AssignmentSubmission.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;


/*
 *   Pretty self-explanatory.
 * */


@Data
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long userId;


    private String firstName;
    private String lastName;
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "unit_id")
    private List<Unit> unitsTaught;

    private Instant created;

    private boolean enabled;

}
