import { useEffect, useState } from "react";
import "./Pending.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Link, useNavigate } from "react-router-dom";
import SidebarImpl from "../../../components/Sidebar/SidebarImpl";
import Loader from "../../../components/Loader/Loader";
import { Assignment } from "../../../models/Assignment";
import AssignmentService from "../../../services/Assignment.service";
import AuthService from "../../../services/Auth.service";

function Pending(){

    const authService = new AuthService();
    const assignmentService = new AssignmentService();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [assignments, setAssignments] = useState<Assignment[]>([]);
    
    useEffect(
        () =>{
          const currentUser = authService.getCurrentUser();
          
          if(!currentUser){
            navigate("/login");
          }

          setTimeout(
            () => {
                assignmentService.getPendingAssignments()
            .then(
                (response) => {
                    setAssignments(response);
                    setLoading(false);
                }
            );
            }
            , 3000);

        ;
    
        }, [navigate]
      );
    
    
  if(loading){
    return(
        <div style={{display: "flex"}}>
            <SidebarImpl/>
      <div className="loader">
            <Loader/>
      </div>
      </div>
    );
  }
    return(
        <div style={{display: "flex"}}>
            <SidebarImpl/>
        <div className="wrapper">
        <div className="card-wrapper">
            
        {assignments.map(
                    (assignment, index) => (
                        <div className="around">
                    <Link to={"/submission/" + assignment.title}
                    state={{assignment: assignment}}
                    style={{textDecoration: "none"}}>
                            
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
                            {assignment.due.toString()}
                        </Typography>
                    </CardContent>


                </Card>
                </Link>
                        </div>
                    )
                )}
            </div>
        </div>
        </div>
    );
}

export default Pending;