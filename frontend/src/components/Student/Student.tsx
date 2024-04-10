import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";
import { Unit } from "../../models/Unit";
import SidebarImpl from "../Sidebar/SidebarImpl";
import AuthService from "../../services/Auth.service";
import StudentService from "../../services/Student.service";
import { StudentDetails } from "../../models/StudentDetails";
import UnitService from "../../services/Unit.service";


function Student(){

    const navigate = useNavigate();

    const [studentDetails, setStudentDetails] = 
    useState<StudentDetails>({registration: "", fullName: "", courseName:""});

    const [units, setUnits] = 
    useState<Unit[]>([]);

    const detailsRef = useRef(studentDetails);
    
    const authService = new AuthService();
    const studentService = new StudentService();
    const unitService = new UnitService();

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

            unitService.getUnitsFromCourse()
            .then(
                (response: Unit[]) => {
                    setUnits(response);
                }
            );

            }
    ), [detailsRef, navigate]);

    return(
        <div style={{display: "flex"}}>
            <SidebarImpl/>
            
            <div style={{display: "block", alignItems: "center", justifyContent: "center"}}>
            <p>{studentDetails.registration}</p>
            <p>{studentDetails.fullName}</p>
            <p>{studentDetails.courseName}</p>

            <div style={{display: "flex"}}>
            {units.map(
                (unit, index) => (
                <div>
                    <p>{unit.code}</p>
                </div>
                )
            )}
            </div>
            </div>
            
        </div>
    );
}

export default Student;