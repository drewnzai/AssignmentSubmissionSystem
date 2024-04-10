import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SidebarImpl from "../../components/Sidebar/SidebarImpl";
import Content from "../Content/Content";

import AuthService from "../../services/Auth.service";
import { Unit } from "../../models/Unit";
import UnitService from "../../services/Unit.service";

function Home(props: any){

  const authService = new AuthService();
  const unitService = new UnitService();

  const [units, setUnits] = 
    useState<Unit[]>([]);

  
  const navigate = useNavigate();
  
  useEffect(
    () =>{
      const currentUser = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

      unitService.getUnitsFromCourse()
      .then(
          (response: Unit[]) => {
              setUnits(response);
          }
      );

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