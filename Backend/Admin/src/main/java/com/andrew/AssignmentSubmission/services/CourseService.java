package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.CourseDto;
import com.andrew.AssignmentSubmission.dto.UnitDto;
import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.models.Student;
import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.models.UnitCourseOffering;
import com.andrew.AssignmentSubmission.repositories.CourseRepository;
import com.andrew.AssignmentSubmission.repositories.OfferingRepository;
import com.andrew.AssignmentSubmission.repositories.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CourseService {

    private CourseRepository courseRepository;
    private OfferingRepository offeringRepository;
    private StudentRepository studentRepository;

    public List<UnitDto> getCourseDetails(String courseName){

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

    public boolean addCourse(String courseName){

        if(courseRepository.existsByName(courseName)){
            return false;
        }
        else{

            Course course = new Course();
            course.setName(courseName);

            courseRepository.save(course);

            return true;
        }
    }

    public boolean deleteCourse(String courseName){
        if(courseRepository.existsByName(courseName)){

            Course course = courseRepository.findByName(courseName);

            offeringRepository.deleteAll(offeringRepository.findAllByCourse(course));

            List<Student> students = studentRepository.findAllByEnrolledCourse(course);

            for(Student student: students){
                student.setEnrolledCourse(null);
                studentRepository.save(student);
            }

            courseRepository.delete(course);

            return true;
        }
        else{

            return false;
        }
    }

}
