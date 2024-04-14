import React, { useEffect } from "react";
import "./Pending.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import assignments from "../../../temp/assignments.json";
import SidebarImpl from "../../../components/Sidebar/SidebarImpl";
import AuthService from "../../../services/Auth.service";
import { useNavigate } from "react-router-dom";

function Pending(){

    const authService = new AuthService();
    const navigate = useNavigate();

    useEffect(
        () =>{
          const currentUser = authService.getCurrentUser();
          
          if(!currentUser){
            navigate("/login");
          }
    
        }, [navigate]
      );
    
    
    return(
        <div style={{display: "flex"}}>
            <SidebarImpl/>
        <div className="wrapper">
        <div className="card-wrapper">
            
        {assignments.map(
                    (assignment, index) => (
                        <div className="around">
                        <Card sx={{width: "200px"
                , height: "200px"
                , backgroundColor: "lightgrey"
                , padding: "8px"
                , borderRadius: "9px"
                }}>
                    <CardContent>
                        
                        <Typography variant="h6">
                            {assignment.title}
                        </Typography>

                        <Typography variant="body1">
                        {assignment.unitCode}
                        </Typography>

                        <Typography variant="body2">
                        {assignment.description}
                        </Typography>

                        <Typography sx={{color: "red"}}>
                            {assignment.due}
                        </Typography>
                    </CardContent>


                </Card>
                        </div>
                    )
                )}
            </div>
        </div>
        </div>
    );
}

export default Pending;