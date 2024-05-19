import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Assignment } from "../../models/Assignment";
import StudentService from "../../services/Student.service";
import { useState } from "react";

export default function SubmissionFromAssignment(){
    
    const location = useLocation();
    const assignment: Assignment = location.state;

    const service = new StudentService();

    const registration = service.getCurrentUserRegistration();

    const [assignmentTitle, setAssignmentTitle] = useState<string>(assignment.title);
    const [studentRegistration, setStudentRegistration] = useState<string>(registration);
    const [unitCode, setUnitCode] = useState<string>(assignment.unitCode);
    const [file, setFile] = useState<File | null>(null);


    
    return(
        <Box>
            
        </Box>
    );
}