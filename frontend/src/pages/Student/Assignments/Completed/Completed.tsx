import React, { useEffect, useState } from "react";
import "./Completed.css";
import SidebarImpl from "../../../../components/Sidebar/SidebarImpl";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
import AuthService from "../../../../services/Auth.service";
import SubmissionService from "../../../../services/Submission.service";
import { Submission } from "../../../../models/Submission";


function Completed(){
    const authService = new AuthService();
    const submissionService = new SubmissionService();

    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    const navigate = useNavigate();

    useEffect(
        () => {
      
            const currentUser: any | null = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

      setTimeout(
        () => {
          submissionService.getAllSubmission()
          .then(
            (response) => {
                setSubmissions(response);
            }, (error) => {
                alert("No submissions");
                navigate("/lecturerDashboard");
            }
          );
        }
      , 3000);
        }
        
        ,[]);

        if(loading){
            return(
              <div className="container">
                <Loader/>
              </div>
            );
          }

    return(
        <div>
            <SidebarImpl/>
            <div className="submission-list">
      {submissions.map((detail, index) => (
        <div key={index} className="submission-item">
          <p><strong>Title:</strong> {detail.assignmentTitle}</p>
          <p><strong>Registration:</strong> {detail.studentRegistration}</p>
          <p><strong>Unit Code:</strong> {detail.unitCode}</p>
          <p><strong>Score:</strong> {detail.score}</p>
          <p><strong>Feedback:</strong> {detail.feedback}</p>
          <p><strong>Accepted:</strong> {detail.accepted ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
        </div>
    );
}

export default Completed;