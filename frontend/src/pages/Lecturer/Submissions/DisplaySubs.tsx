import { useEffect, useState } from "react";
import LecSidebar from "../../../components/Sidebar/LecSidebar";
import "./DisplaySubs.css";
import { Submission } from "../../../models/Submission";
import LecSubmissionService from "../../../services/LecSubmission.service";
import LecAuthService from "../../../services/LecAuth.service";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

export default function DisplaySubs(){
    const authService = new LecAuthService();
    const submissionService = new LecSubmissionService();

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
                setLoading(false);
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
            <LecSidebar/>
            <div className="submission-list">
      {submissions.map((detail, index) => (
        <Link to={"/modify/" + detail.assignmentTitle}
        state={{submission: detail}}
        style={{textDecoration: "none"}}
        >
        <div key={index} className="submission-item">
          <p><strong>Title:</strong> {detail.assignmentTitle}</p>
          <p><strong>Registration:</strong> {detail.studentRegistration}</p>
          <p><strong>Unit Code:</strong> {detail.unitCode}</p>
          <p><strong>Score:</strong> {detail.score}</p>
          <p><strong>Feedback:</strong> {detail.feedback}</p>
          <p><strong>Accepted:</strong> {detail.accepted ? "Yes" : "No"}</p>
        </div>
        </Link>
      ))}
    </div>
        </div>
    );
}