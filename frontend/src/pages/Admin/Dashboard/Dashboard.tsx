import { useEffect, useState } from "react";
import AdAuthService from "../../../services/AdAuth.service";
import { useNavigate } from "react-router-dom";
import AdSidebar from "../../../components/Sidebar/AdSidebar";
import "./Dashboard.css";
import Loader from "../../../components/Loader/Loader";

function AdDashboard(){
    const authService = new AdAuthService();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
  
    
    useEffect(() => {
      const currentUser: any | null = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }
      setTimeout(
        () => {
          
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

    return (
        <div>
        <AdSidebar/>
        </div>
      );
    
}

export default AdDashboard;