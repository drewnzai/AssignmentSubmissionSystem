package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.CourseDto;
import com.andrew.AssignmentSubmission.dto.UnitDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.*;
import com.andrew.AssignmentSubmission.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UnitService {

    private AssignmentRepository assignmentRepository;
    private UnitRepository unitRepository;
    private UserRepository userRepository;
    private SemesterRepository semesterRepository;
    private OfferingRepository offeringRepository;
    private CourseRepository courseRepository;


    public List<UnitDto> getCurrentUnitsFromCourse(String courseName){

        Course course = courseRepository.findByName(courseName);

        List<UnitDto> units = new ArrayList<>();

        for(UnitCourseOffering courseOffering: course.getUnitCourseOfferings()){
            Unit unit = courseOffering.getUnit();

            UnitDto unitDto = new UnitDto();

            unitDto.setName(unit.getName());
            unitDto.setCode(unit.getCode());
            unitDto.setSemester(unit.getSemester().getName());
            unitDto.setDescription(unit.getDescription());
            unitDto.setCredits(unit.getCredits());
            unitDto.setLecturerEmail(unit.getLecturer().getEmail());

            units.add(unitDto);

        }

        return units;
    }
}
