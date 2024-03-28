package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.Assigned;
import com.andrew.AssignmentSubmission.dto.UserDto;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.OfferingRepository;
import com.andrew.AssignmentSubmission.repositories.UnitRepository;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private UnitRepository unitRepository;
    private OfferingRepository offeringRepository;

    public Assigned getAssignedUnits(String email){

        if(userRepository.existsByEmail(email)) {

            Assigned assigned = new Assigned();

            User user = userRepository.findByEmail(email);

            List<Unit> units =unitRepository.findAllByLecturer(user);
            List<String> unitCodes = new ArrayList<>();

            for(Unit unit: units){
                assigned.setFullName(user.getFirstName() + " " + user.getLastName());
                unitCodes.add(unit.getCode());
            }

            assigned.setUnitCodes(unitCodes);

            return assigned;

        }
        else{
            throw new AssignmentException("No such user or the lecturer has no assigned units " + email);
        }
    }


}
