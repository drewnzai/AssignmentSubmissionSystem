import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";
import { Unit } from "../../models/Unit";
import SidebarImpl from "../../components/Sidebar/SidebarImpl";
import AuthService from "../../services/Auth.service";
import StudentService from "../../services/Student.service";
import { StudentDetails } from "../../models/StudentDetails";
import UnitService from "../../services/Unit.service";
import { UnitContext } from "../../contexts/UnitContext";


function Student(){

    const navigate = useNavigate();

    const [studentDetails, setStudentDetails] = 
    useState<StudentDetails>({registration: "", fullName: "", courseName:""});

    const [units, setUnits] = 
    useState<Unit[]>([]);

    const detailsRef = useRef(studentDetails);
    
    const authService = new AuthService();
    const studentService = new StudentService();

    useEffect((
        () => {
            const currentUser = authService.getCurrentUser();

            if(!currentUser){
                navigate("/login");
              }
            
            studentService.getDetails()
              .then(
                (response: StudentDetails) => { 
                    
                    setStudentDetails(response);
                }
              );

            }
    ), [detailsRef, navigate]);

    return(
        <div style={{display: "flex"}}>
          <UnitContext.Provider value={units}>
            <SidebarImpl/>
            
            <div style={{display: "block", alignItems: "center", justifyContent: "center"}}>

            <p>{studentDetails.registration}</p>
            <p>{studentDetails.fullName}</p>
            <p>{studentDetails.courseName}</p>

            </div>
            </UnitContext.Provider>
        </div>
    );
}

export default Student;