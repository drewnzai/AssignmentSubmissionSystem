import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";
import SidebarImpl from "../Sidebar/SidebarImpl";
import AuthService from "../../services/Auth.service";
import StudentService from "../../services/Student.service";
import { StudentDetails } from "../../models/StudentDetails";


function Student(){

    const navigate = useNavigate();

    const [studentDetails, setStudentDetails] = 
    useState<StudentDetails>({registration: "", fullName: "", courseName:""});

    const authService = new AuthService();

    const detailsRef = useRef(studentDetails);

    useEffect((
        () => {
            const currentUser = authService.getCurrentUser();

            if(!currentUser){
                navigate("/login");
              }
            
              StudentService.getDetails()
              .then(
                (response: StudentDetails) => { 
                    
                    setStudentDetails(response);
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

            
            </div>
            
        </div>
    );
}

export default Student;