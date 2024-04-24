import { useLocation, useNavigate } from "react-router-dom";
import { Submission } from "../../../models/Submission";
import { useState } from "react";
import LecAuthService from "../../../services/LecAuth.service";
import LecSubmissionService from "../../../services/LecSubmission.service";
import { FormControlLabel, Checkbox, IconButton } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

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

    const handleDownload = () => {
        // Assuming the 'path' contains a valid URL to a downloadable file
        window.open(details.path, '_blank');
    };


    const handleSubmitChanges = () => {
        console.log('Updated Details:', details);

        submissionService.modifySubmission(details)
        .then(
            (response) => {
                console.log(response);
                alert("Submission modified successfully");
                navigate("/lecturerDashboard");
            },
            (error) => {
                alert("Could not modify the assignment");
                navigate("/lecturerDashboard");
            }
        );
        // Implement functionality to handle updated details
    };

    return (
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
            <IconButton onClick={handleDownload} aria-label="download" size="large">
                <CloudDownloadIcon />
            </IconButton>
            <button onClick={handleSubmitChanges}>Submit Changes</button>
        </div>
    );
}