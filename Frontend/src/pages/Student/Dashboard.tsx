import {useEffect, useState} from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Student/Sidebar";
import {Unit} from "../../models/Unit";
import Box from "@mui/material/Box/Box";
import {Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Link} from "react-router-dom";
import Topbar from "../../components/Topbar";
import StudentService from "../../services/Student.service";

export default function StudentDashboard(){
    
    const service = new StudentService();

    const [units, setUnits] = useState<Unit[]>([]);
    
    useEffect(
        () => {
            service.getCurrentUnits()
            .then(
                (response: Unit[]) => {
                    setUnits(response);
                }
            )
        }, []
    );
    
    return(
        <div className="app"> 
            <Sidebar/>
            <main className="content">
                <Topbar/>
                <Header title="Dashboard" subtitle="Current Assigned Units"/>
                <Box 
                m="15px" 
                display="flex"
                flexWrap="wrap"
                gap="15px"
                justifyContent="flex-start"
               >
                {units.map(
                    (unit) => (
                        <Link 
                        key={unit.code}
                        to={`/student/assignments/${unit.code}`}
                        state={unit}
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
                                    {unit.code}
                                </Typography>
                                <Typography variant="h6">
                                    {unit.name}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Link>
                    )
                    
                    )}
                    </Box>
            </main>
            
            </div>
       
        
        );
}