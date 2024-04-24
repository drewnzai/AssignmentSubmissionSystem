package com.andrew.AssignmentSubmission.services;

import com.andrew.AssignmentSubmission.dto.Assigned;
import com.andrew.AssignmentSubmission.dto.LecturerRequest;
import com.andrew.AssignmentSubmission.exceptions.AssignmentException;
import com.andrew.AssignmentSubmission.models.Role;
import com.andrew.AssignmentSubmission.models.Unit;
import com.andrew.AssignmentSubmission.models.User;
import com.andrew.AssignmentSubmission.repositories.RoleRepository;
import com.andrew.AssignmentSubmission.repositories.UnitRepository;
import com.andrew.AssignmentSubmission.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private UnitRepository unitRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

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

    public boolean addLecturer(LecturerRequest lecturerRequest){
        String email = lecturerRequest.getFirstName() + "." + lecturerRequest.getLastName() +
                "@egerton.ac.ke";

        if(userRepository.existsByEmail(email)){
            return false;
        }
        User user = new User();
        Role role = roleRepository.findByName("ROLE_LECTURER")
                .orElseThrow(() -> new AssignmentException("No such Role"));

        user.setFirstName(lecturerRequest.getFirstName());
        user.setLastName(lecturerRequest.getLastName());
        user.setPassword(passwordEncoder
                .encode("lecturer"));
        user.setCreated(Instant.now());
        user.setEnabled(true);
        user.setRole(role);

        userRepository.save(user);


        return true;
    }

    public boolean deleteLecturer(LecturerRequest lecturerRequest){
        String email = lecturerRequest.getFirstName() + "." + lecturerRequest.getLastName() +
                "@egerton.ac.ke";

        if(!userRepository.existsByEmail(email)){
            return false;
        }

        User user = userRepository.findByEmail(email);

        userRepository.delete(user);

        return true;
    }

}
