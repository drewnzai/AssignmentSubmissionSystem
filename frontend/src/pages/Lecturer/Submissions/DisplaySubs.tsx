import {useEffect, useState} from "react";
import LecSidebar from "../../../components/Sidebar/LecSidebar";
import "./DisplaySubs.css";
import {Submission} from "../../../models/Submission";
import LecSubmissionService from "../../../services/Lecturer/LecSubmission.service";
import LecAuthService from "../../../services/Lecturer/LecAuth.service";
import {Link, useNavigate} from "react-router-dom";
import {IconButton} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Loader from "../../../components/Loader/Loader";
import axios from "axios";
import {MiscRequest} from "../../../models/MiscRequest";
import LecAuthHeader from "../../../auth/LecAuth.header";

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
                console.log(response);
                setLoading(false);
            }, (error) => {
                alert("No submissions");
                navigate("/lecturerDashboard");
            }
          );
        }
      , 50);
        }
        
        ,[navigate]);

    const handleDownload = async (path: string) => {

        const miscRequest: MiscRequest = {
            data: path
        }

        try {

            const response = await axios.post("http://localhost:8081/api/file/download", miscRequest, {
                headers: LecAuthHeader(),
                responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${path.replace(/\//g, '_')}.zip`); // Use the file name from the response or choose a default
            document.body.appendChild(link);
            link.click();
            // @ts-ignore
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };
        if(loading){
            return(
              <div className="container">
                <Loader/>
              </div>
            );
          }

    return(
        <div style={{display: "flex"}}>
            <LecSidebar/>
            <div className="submission-list">
      {submissions.map((detail, index) => (
        
        <div key={index} className="submission-item">
          <p><strong>Title:</strong> {detail.assignmentTitle}</p>
          <p><strong>Registration:</strong> {detail.studentRegistration}</p>
          <p><strong>Unit Code:</strong> {detail.unitCode}</p>
          <p><strong>Score:</strong> {detail.score}</p>
          <p><strong>Feedback:</strong> {detail.feedback}</p>
          <p><strong>Accepted:</strong> {detail.accepted ? "Yes" : "No"}</p>
          <Link to={"/modify/" + detail.assignmentTitle}
        state={{submission: detail}}
        style={{textDecoration: "none"}}
        > 
        <div>
          <p>Modify</p>
        </div>
        
        </Link>
            <IconButton onClick={() => handleDownload(detail.path)} aria-label="download">
                <CloudDownloadIcon />
            </IconButton>
        </div>
      ))}
    </div>
        </div>
    );
}