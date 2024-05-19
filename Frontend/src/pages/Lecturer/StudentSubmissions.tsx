import {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Lecturer/Sidebar";
import {Submission} from "../../models/Submission";
import LecturerService from "../../services/Lecturer.service";
import SubmissionComponent from "../../components/Lecturer/SubmissionComponent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography/Typography";
import Topbar from "../../components/Admin/Topbar";

export default function StudentSubmissions(){
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    const service = new LecturerService();

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