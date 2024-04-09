import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SidebarImpl from "../Sidebar/SidebarImpl";
import Content from "../Content/Content";

import AuthService from "../../services/Auth.service";

function Home(props: any){
  
  const navigate = useNavigate();
  
  useEffect(
    () =>{
      const currentUser = AuthService.getCurrentUser();
      
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