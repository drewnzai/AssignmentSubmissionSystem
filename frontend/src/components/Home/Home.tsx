import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SidebarImpl from "../Sidebar/SidebarImpl";

function Home(props: any){
  

  return (
    <div style={{display: "flex"}}>
    <SidebarImpl/>
    <div>
      <h1>MainBar</h1>
    </div>
    </div>
  );

  
}

export default Home;