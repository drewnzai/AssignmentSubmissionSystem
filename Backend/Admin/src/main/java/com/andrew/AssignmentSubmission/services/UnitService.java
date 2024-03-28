package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.UnitDto;
import com.andrew.AssignmentSubmission.models.Semester;
import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.SemesterRepository;
import com.andrew.AssignmentSubmission.repositories.UnitRepository;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UnitService {

    private UnitRepository unitRepository;
    private UserRepository userRepository;
    private SemesterRepository semesterRepository;

    public boolean addUnit(UnitDto unitDto){

        if(unitRepository.existsByName(unitDto.getName())){
            return false;
        }
        else{

            Unit unit = new Unit();

            User lecturer = userRepository.findByEmail(unitDto.getLecturerEmail());
            Semester semester = semesterRepository.findByName(unitDto.getSemester());

            unit.setName(unitDto.getName());
            unit.setCode(unitDto.getCode());
            unit.setDescription(unitDto.getDescription());
            unit.setCredits(unitDto.getCredits());
            unit.setSemester(semester);
            unit.setLecturer(lecturer);

            unitRepository.save(unit);

            return true;
        }
    }

    public boolean deleteUnit(UnitDto unitDto){

        if(unitRepository.existsByName(unitDto.getName())){
            Unit unit  = unitRepository.findByName(unitDto.getName());

            unitRepository.delete(unit);

            return true;
        }
        else{

            throw new AssignmentException("No such Unit");

            return false;
        }
    }

    public boolean modifyUnit(UnitDto unitDto){

        if(unitRepository.existsByName(unitDto.getName())){

            Unit unit  = unitRepository.findByName(unitDto.getName());

            User lecturer = userRepository.findByEmail(unitDto.getLecturerEmail());
            Semester semester = semesterRepository.findByName(unitDto.getSemester());

            unit.setName(unitDto.getName());
            unit.setCode(unitDto.getCode());
            unit.setDescription(unitDto.getDescription());
            unit.setCredits(unitDto.getCredits());
            unit.setSemester(semester);
            unit.setLecturer(lecturer);

            unitRepository.save(unit);

            return true;

        }
        else{

            throw new AssignmentException("No such Unit");

            return false;
        }

    }
}
