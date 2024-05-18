import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Sidebar from "../../components/Student/Sidebar";
import Topbar from "../../components/Admin/Topbar";
import Header from "../../components/Header/Header";
import { Unit } from "../../models/Unit";
import { Assignment } from "../../models/Assignment";
import StudentService from "../../services/Student.service";


export default function PendingFromUnit(){
    const location = useLocation();
    const unit: Unit = location.state;

    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const service = new StudentService();

    useEffect(
        () => {
            service.getAllPendingAssignmentsByUnit(unit.code)
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
            <Topbar/>
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
                        to={`/student/assignment/${assignment.title}/submission`}
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