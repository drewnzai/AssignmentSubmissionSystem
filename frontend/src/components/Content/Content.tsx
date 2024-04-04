import React from "react";

import "./Content.css";

import units from "../../temp/units.json";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Content(){
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