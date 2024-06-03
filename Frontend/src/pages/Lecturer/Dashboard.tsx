import { Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Unit } from "../../models/Unit";
import LecturerService from "../../services/Lecturer.service";

export default function LecturerDashboard(){
    
    const service = new LecturerService();

    const [units, setUnits] = useState<Unit[]>([]);
    
    useEffect(
        () => {
            service.getAssignedUnits()
            .then(
                (response: Unit[]) => {
                    setUnits(response);
                }
            )
        }, []
    );
    
    return(
        <div>
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
                        to={`/lecturer/assignments/${unit.code}`}
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
            
            
            </div>
       
        
        );
}