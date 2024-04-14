import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarImpl from "../../components/Sidebar/SidebarImpl";
import Content from "../Content/Content";
import "./Home.css";

import AuthService from "../../services/Auth.service";
import UnitService from "../../services/Unit.service";

function Home(){

  const authService = new AuthService();
  const unitService = new UnitService();

  
  const navigate = useNavigate();
  
  useEffect(
    () =>{
      const currentUser = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

      unitService.getUnitsFromCourse();

    }, [navigate]
  );

  
  return (
    <div style={{display: "flex"}}>
    <SidebarImpl/>
    <Content/>
    </div>
  );

  
}

export default Home;