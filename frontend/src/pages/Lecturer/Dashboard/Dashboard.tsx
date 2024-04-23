import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LecAuthService from "../../../services/LecAuth.service";
import LecSidebar from "../../../components/Sidebar/LecSidebar";
import { Unit } from "../../../models/Unit";
import LecUnitService from "../../../services/LecUnit.service";
import Loader from "../../../components/Loader/Loader";
import "./Dashboard.css";

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
            (response) => {
              console.log(response);
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
        <div>
            <LecSidebar/>
        </div>
    );
}

export default LecDashboard;