import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import SidebarImpl from "../../../components/Sidebar/SidebarImpl";
import {StudentDetails} from "../../../models/StudentDetails";
import AuthService from "../../../services/Student/Auth.service";
import StudentService from "../../../services/Student/Student.service";
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
          const currentUser: any | null = authService.getCurrentUser();

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
            
            <div className="student-details-container">
      <h1>Student Details</h1>
      <div className="detail">
        <strong>Registration Number:</strong> {studentDetails.registration}
      </div>
      <div className="detail">
        <strong>Full Name:</strong> {studentDetails.fullName}
      </div>
      <div className="detail">
        <strong>Course Name:</strong> {studentDetails.courseName}
      </div>
    </div>
        </div>
    );
}

export default Student;