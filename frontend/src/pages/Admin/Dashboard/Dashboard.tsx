import { useEffect } from "react";
import AdAuthService from "../../../services/AdAuth.service";
import { useNavigate } from "react-router-dom";
import AdSidebar from "../../../components/Sidebar/AdSidebar";

function AdDashboard(){
    const authService = new AdAuthService();
    const navigate = useNavigate();
    
    useEffect(() => {
        const currentUser = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

    }, []);

    return (
        <div>
        <AdSidebar/>
        </div>
      );
    
}

export default AdDashboard;