import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import SubmissionComponent from "../../components/Lecturer/SubmissionComponent";
import { Assignment } from "../../models/Assignment";
import { Submission } from "../../models/Submission";
import LecturerService from "../../services/Lecturer.service";

export default function SubmissionsFromAssignment(){
    const location = useLocation();
    const assignment: Assignment = location.state;

    const service = new LecturerService();

    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(
        () => {
            service.getAllSubmissionsFromAssignment(assignment.title)
            .then(
                (response: Submission[]) => {
                    setSubmissions(response);
                }
            )
        }, []
    );

    return(
        <div>
            <Header title="Submissions" subtitle={`Submissions From ${assignment.title}`}/>
            {submissions.length > 0 ? 
                submissions.map(
                    (submission) => (
                        <>
                        <SubmissionComponent submission={submission}/>
                        </>
                    )
                )
             : (
             <Box
                m="15px"
                width="100%"
                height="100%"
                alignItems={"center"}
                justifyContent={"center"}
                >
                    <Typography variant="h1">
                        No Submissions Yet
                    </Typography>
                </Box>) }
        </div>
    );
}