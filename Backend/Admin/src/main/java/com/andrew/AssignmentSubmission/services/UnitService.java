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

    public List<String> getAssignedCourses(String unitCode){
        Unit unit = unitRepository.findByCode(unitCode);

        List<String> courses = new ArrayList<>();

        for(UnitCourseOffering courseOffering: unit.getCourseOfferings()){
            Course course = courseOffering.getCourse();

            courses.add(course.getName());

        }

        return courses;
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
