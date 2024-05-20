import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Topbar from "../../components/Admin/Topbar";
import Header from "../../components/Header/Header";
import SubmissionComponent from "../../components/Student/SubmissionComponent";
import { Submission } from "../../models/Submission";
import StudentService from "../../services/Student.service";


export default function Submissions(){
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    const service = new StudentService();

    useEffect(
        () => {
            service.getAllSubmissions()
            .then(
                (response: Submission[]) => {
                    setSubmissions(response);
                }
            )
        },[]
    );
    
    return(
        <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Topbar/>
            <Header title="Submissions" subtitle="Submissions From All Students"/>

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