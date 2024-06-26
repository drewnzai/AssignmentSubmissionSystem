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


    public boolean addUnit(UnitDto unitDto){

        if(unitRepository.existsByName(unitDto.getName())){
            return false;
        }
        else{

            Unit unit = new Unit();

            map(unitDto, unit);

            return true;
        }
    }

    public boolean deleteUnit(UnitDto unitDto){

        if(unitRepository.existsByName(unitDto.getName())){
            Unit unit  = unitRepository.findByName(unitDto.getName());

            assignmentRepository.deleteAll(assignmentRepository.findAllByUnit(unit));
            offeringRepository.deleteAll(offeringRepository.findAllByUnit(unit));

            unitRepository.delete(unit);

            return true;
        }
        else{

            throw new AssignmentException("No such Unit");

        }
    }

    public boolean modifyUnit(UnitDto unitDto){

        if(unitRepository.existsByName(unitDto.getName())){

            Unit unit  = unitRepository.findByName(unitDto.getName());

            map(unitDto, unit);

            return true;

        }
        else{

            throw new AssignmentException("No such Unit");

        }

    }

    public List<UnitDto> getUnitsFromCourse(String courseName){

        List<UnitCourseOffering> offerings = offeringRepository
                .findAllByCourse
                        (
                                courseRepository.findByName(courseName)
                        );

        List<UnitDto> units = new ArrayList<>();

        for(UnitCourseOffering courseOffering: offerings){
            Unit unit = courseOffering.getUnit();

            UnitDto unitDto = mapToDto(unit);

            units.add(unitDto);

        }

        return units;
    }

    public List<UnitDto> getUnitsAssignedToLecturer(String email){
        User lecturer = userRepository.findByEmail(email);
        List<UnitDto> units = new ArrayList<>();

        for(Unit unit: unitRepository.findAllByLecturer(lecturer)){

            UnitDto unitDto = mapToDto(unit);

            units.add(unitDto);
        }
        return units;
    }

    private UnitDto mapToDto(Unit unit) {
        UnitDto unitDto = new UnitDto();
        unitDto.setName(unit.getName());
        unitDto.setCode(unit.getCode());
        unitDto.setSemester(unit.getSemester().getName());
        unitDto.setDescription(unit.getDescription());
        unitDto.setCredits(unit.getCredits());
        unitDto.setLecturerEmail(unit.getLecturer().getEmail());

        return unitDto;
    }

    private void map(UnitDto unitDto, Unit unit) {
        User lecturer = userRepository.findByEmail(unitDto.getLecturerEmail());
        Semester semester = semesterRepository.findByName(unitDto.getSemester());

        List<CourseDto> courses = unitDto.getCourses();


        unit.setName(unitDto.getName());
        unit.setCode(unitDto.getCode());
        unit.setDescription(unitDto.getDescription());
        unit.setCredits(unitDto.getCredits());
        unit.setSemester(semester);
        unit.setLecturer(lecturer);

        unitRepository.save(unit);

        for(CourseDto courseDto: courses){
            Course course = courseRepository.findByName(courseDto.getName());
            UnitCourseOffering courseOffering = new UnitCourseOffering();

            courseOffering.setUnit(unit);
            courseOffering.setCourse(course);

            offeringRepository.save(courseOffering);

        }

    }
}
