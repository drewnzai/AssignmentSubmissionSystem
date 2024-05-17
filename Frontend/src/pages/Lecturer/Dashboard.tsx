import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Lecturer/Sidebar";
import LecturerService from "../../services/Lecturer.service";
import { Unit } from "../../models/Unit";
import Box from "@mui/material/Box/Box";
import { Typography } from "@mui/material";

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
        <div className="app"> 
            <Sidebar/>
            <main className="content">
                <Header title="Dashboard" subtitle="Lecturer Home"/>
                <Box m="5px">
                {units.map(
                    (unit) => (
                        <Box>
                            <Typography>
                            {unit.code}
                            </Typography>
                            <Typography>
                            {unit.name}
                            </Typography>
                        </Box>
                    )
                    
                    )}
                    </Box>
            </main>
            
            </div>
       
        
        );
}