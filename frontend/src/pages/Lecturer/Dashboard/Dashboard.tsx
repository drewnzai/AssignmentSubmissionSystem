import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LecAuthService from "../../../services/LecAuth.service";
import LecSidebar from "../../../components/Sidebar/LecSidebar";

function LecDashboard(){
    const authService = new LecAuthService();
    const navigate = useNavigate();
    
    useEffect(() => {
        const currentUser: any | null = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

    }, [navigate]);

    return(
        <div>
            <LecSidebar/>
        </div>
    );
}

export default LecDashboard;