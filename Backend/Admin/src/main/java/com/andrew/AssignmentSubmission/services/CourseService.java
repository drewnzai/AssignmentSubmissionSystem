package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.CourseDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Course;
import com.andrew.AssignmentSubmission.repositories.CourseRepository;
import com.andrew.AssignmentSubmission.repositories.OfferingRepository;
import com.andrew.AssignmentSubmission.repositories.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CourseService {

    private CourseRepository courseRepository;
    private OfferingRepository offeringRepository;
    private StudentRepository studentRepository;

    public CourseDto getCourseDetails(String courseName){

        Course course = courseRepository.findByName(courseName);

        return new CourseDto(course.getName());
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

            courseRepository.delete(course);

            return true;
        }
        else{

            return false;
        }
    }

}
