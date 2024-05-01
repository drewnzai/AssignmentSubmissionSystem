import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LecSidebar from "../../../components/Sidebar/LecSidebar";
import { Submission } from "../../../models/Submission";
import LecAuthService from "../../../services/Lecturer/LecAuth.service";
import LecSubmissionService from "../../../services/Lecturer/LecSubmission.service";
import "./ModifySub.css";

export default function ModifySub(){
    const location = useLocation();
    const navigate = useNavigate();

    const authService = new LecAuthService();
    const submissionService = new LecSubmissionService();


    const {submission} = location.state;

    const [details, setDetails] = useState<Submission>(submission);

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({
            ...details,
            score: parseInt(e.target.value, 10) // Parse the input as integer
        });
    };

    const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetails({
            ...details,
            feedback: e.target.value
        });
    };

    const handleAcceptedChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setDetails({
            ...details,
            accepted: checked
        });
    };

    const handleSubmitChanges = () => {
        console.log('Updated Details:', details);

        submissionService.modifySubmission(details)
        .then(
            (response) => {
                console.log(response);
                toast.success("Submission modified successfully");
                navigate("/lecturerDashboard");
            },
            (error) => {
                toast.error("Could not modify the assignment");
                navigate("/lecturerDashboard");
            }
        );
        
    };

    return (
        <div style={{display: "flex"}}>
      <LecSidebar/>
        <div className="assignment-container">
            <h2>Assignment: {details.assignmentTitle}</h2>
            <p><strong>Registration:</strong> {details.studentRegistration}</p>
            <p><strong>Unit Code:</strong> {details.unitCode}</p>
            <div>
                <label htmlFor="score">Score:</label>
                <input type="number" id="score" value={details.score} onChange={handleScoreChange} />
            </div>
            <div>
                <label htmlFor="feedback">Feedback:</label>
                <textarea id="feedback" value={details.feedback} onChange={handleFeedbackChange}></textarea>
            </div>
            <FormControlLabel
                control={<Checkbox checked={details.accepted} onChange={handleAcceptedChange} color="primary" />}
                label="Accepted"
            />
            <button onClick={handleSubmitChanges}>Submit Changes</button>
        </div>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}