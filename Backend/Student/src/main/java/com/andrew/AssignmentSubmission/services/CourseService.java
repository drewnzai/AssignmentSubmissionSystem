package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.UnitDto;
import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.models.UnitCourseOffering;
import com.andrew.AssignmentSubmission.repositories.CourseRepository;
import com.andrew.AssignmentSubmission.repositories.OfferingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private CourseRepository courseRepository;
    private OfferingRepository offeringRepository;

    public List<UnitDto> getCourseDetails(String courseName){

        List<UnitCourseOffering> offerings = offeringRepository
                .findAllByCourse(
                        courseRepository.findByName(courseName)
                );

        List<UnitDto> units = new ArrayList<>();

        for(UnitCourseOffering courseOffering: offerings){
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
