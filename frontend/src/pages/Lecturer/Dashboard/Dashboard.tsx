import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LecAuthService from "../../../services/LecAuth.service";
import LecSidebar from "../../../components/Sidebar/LecSidebar";
import {Unit} from "../../../models/Unit";
import LecUnitService from "../../../services/LecUnit.service";
import Loader from "../../../components/Loader/Loader";
import "./Dashboard.css";
import {Card, CardContent, Typography} from "@mui/material";

function LecDashboard(){
    const authService = new LecAuthService();
    const unitService = new LecUnitService();
    
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
  
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const currentUser: any | null = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

      setTimeout(
        () => {
          unitService.getAssignedUnits()
          .then(
            (response: Unit[]) => {
              setUnits(response);
              setLoading(false);
            }
          );
        }
      , 3000);

    }, [navigate]);

    if(loading){
      return(
        <div className="container">
          <Loader/>
        </div>
      );
    }

    return(
        <div style={{display: "flex"}}>
            <LecSidebar/>

            <div className="wrapper"> 
            <h1>Assigned Units</h1>
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
        </div>
    );
}

export default LecDashboard;