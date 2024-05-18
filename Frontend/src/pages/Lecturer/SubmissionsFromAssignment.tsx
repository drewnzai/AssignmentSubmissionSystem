import {useLocation} from "react-router-dom";
import {Assignment} from "../../models/Assignment";
import {useEffect, useState} from "react";
import Sidebar from "../../components/Lecturer/Sidebar";
import Header from "../../components/Header/Header";
import Topbar from "../../components/Admin/Topbar";
import { Submission } from "../../models/Submission";
import { Box, Typography } from "@mui/material";
import SubmissionComponent from "../../components/Lecturer/SubmissionComponent";
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
        <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Topbar/>
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
        </main>
        </div>
    );
}