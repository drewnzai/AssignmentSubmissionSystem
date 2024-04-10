import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SidebarImpl from "../../components/Sidebar/SidebarImpl";
import Content from "../Content/Content";

import AuthService from "../../services/Auth.service";

function Home(props: any){

  const authService = new AuthService();
  
  const navigate = useNavigate();
  
  useEffect(
    () =>{
      const currentUser = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

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