import {useEffect, useState} from "react";

import "./Content.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import {Unit} from "../../../models/Unit";
import AuthService from "../../../services/Auth.service";

function Content(){
    
    const navigate = useNavigate();
    const [units, setUnits] = useState<Unit[]>([]);

    const authService = new AuthService();

    useEffect((
        () => {
            const currentUser: any | null = authService.getCurrentUser();

            if(!currentUser){
                navigate("/login");
              }
              
              setUnits(
                JSON.parse(
                    localStorage.getItem("units")!
                )
              );

        }
    ), []);
    return(
        <div className="wrapper"> 
            <h1>Course Overview</h1>
        <div className="card-wrapper">
            
        {units.map(
            (unit, index) => (
                <div className="around">
                <Card sx={{width: "200px"
                , height: "200px"
                , backgroundColor: "lightgrey"
                , padding: "8px"
                , borderRadius: "9px"
                }}>
                    <CardContent>
                        <Typography variant="h6" textOverflow={"ellipsis"}>
                            {unit.code}
                        </Typography>
                        <Typography variant="body1">
                            {unit.name}
                        </Typography>
                        <Typography variant="body2">
                            {unit.description}
                        </Typography>
                    </CardContent>
                </Card>
                </div>
                
            )
        )}
      </div>
      </div>
    );
}

export default Content;