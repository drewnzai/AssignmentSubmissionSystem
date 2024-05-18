import { Link, useLocation } from "react-router-dom";
import { Unit } from "../../models/Unit";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Lecturer/Sidebar";
import { useEffect, useState } from "react";
import { Assignment } from "../../models/Assignment";
import LecturerService from "../../services/Lecturer.service";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function Assignments(){
    const location = useLocation();
    const unit: Unit = location.state;

    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const service = new LecturerService();

    useEffect(
        () => {
            service.getAssignmentsFromUnit(unit.code)
            .then(
                (response: Assignment[]) => {
                    setAssignments(response);
                }
            )
        }, []
    );
    

    return(
        <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Header title="Assignments" subtitle={`Assignments From ${unit.code} : ${unit.name}`}/>
            <Box
            m="15px" 
            display="flex"
            flexWrap="wrap"
            gap="15px"
            justifyContent="flex-start"
            >
                {assignments.length > 0 ? assignments.map(
                    (assignment) => (
                        <Link 
                        key={assignment.title}
                        to={`/lecturer/assignment/${assignment.title}/submissions`}
                        state={assignment}
                        style={{
                            textDecoration: "none"
                        }}
                        >
                        <Card sx={{
                            height: "fit-content",
                            width: "250px",
                            margin: "15px"
                        }}>
                            <CardContent>
                                <Typography variant="h5">
                                    {assignment.title}
                                </Typography>
                                <Typography variant="h6">
                                    {assignment.description}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Link>
                    )
                ) : <Box
                width="100%"
                height="100%"
                alignItems={"center"}
                justifyContent={"center"}
                >
                    <Typography variant="h1">
                        No Pending Assignments Yet
                    </Typography>
                </Box>
}
            </Box>
        </main>
        </div>
    );
}