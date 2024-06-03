import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
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
        <div>
            <Header title="Submissions" subtitle="All My Submissions"/>
            <Box 
            display="flex"
            flexWrap="wrap"
            gap="15px"
            justifyContent="flex-start"
            >
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

                </Box>
        </div>
    );
}