import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarImpl from "../../../components/Sidebar/SidebarImpl";
import { StudentDetails } from "../../../models/StudentDetails";
import AuthService from "../../../services/Auth.service";
import StudentService from "../../../services/Student.service";
import "./Student.css";


function Student(){

    const navigate = useNavigate();

    const [studentDetails, setStudentDetails] = 
    useState<StudentDetails>({registration: "", fullName: "", courseName:""});

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
    ), [navigate]);

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