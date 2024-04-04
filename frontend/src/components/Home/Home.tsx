import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SidebarImpl from "../Sidebar/SidebarImpl";
import Content from "../Content/Content";

function Home(props: any){
  

  return (
    <div style={{display: "flex"}}>
    <SidebarImpl/>
    <Content/>
    </div>
  );

  
}

export default Home;