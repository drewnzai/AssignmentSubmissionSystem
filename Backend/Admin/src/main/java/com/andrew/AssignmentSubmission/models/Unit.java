package com.andrew.AssignmentSubmission.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "units")
@AllArgsConstructor
@NoArgsConstructor
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long unitId;
    private String name;
    private String code;
    private int credits;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;


    @ManyToOne
    @JoinColumn(name = "lecturer_id")
    private User lecturer;

    @OneToMany(mappedBy = "unit")
    private List<UnitCourseOffering> courseOfferings;
}
