import { useEffect } from "react";
import AdAuthService from "../../../services/AdAuth.service";
import { useNavigate } from "react-router-dom";
import AdSidebar from "../../../components/Sidebar/AdSidebar";
import "./Dashboard.css";

function AdDashboard(){
    const authService = new AdAuthService();
    const navigate = useNavigate();
    
    useEffect(() => {
      const currentUser: any | null = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

    }, [navigate]);

    return (
        <div>
        <AdSidebar/>
        </div>
      );
    
}

export default AdDashboard;