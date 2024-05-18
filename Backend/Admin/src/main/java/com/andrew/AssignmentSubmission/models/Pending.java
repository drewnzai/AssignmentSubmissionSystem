package com.andrew.AssignmentSubmission.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "pending")
@AllArgsConstructor
@NoArgsConstructor
public class Pending {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pendingId;
    private String title;

    @Lob
    @Column(length = 16777216)
    private String description;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private Unit unit;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate due;


}
