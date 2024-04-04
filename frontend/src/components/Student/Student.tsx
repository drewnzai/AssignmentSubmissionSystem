import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";
import SidebarImpl from "../Sidebar/SidebarImpl";
import authService from "../../auth/auth.service";

function Student(){

    const navigate = useNavigate();

    useEffect((
        () => {
            const currentUser = authService.getCurrentUser();

            if(!currentUser){
                navigate("/login");
              }
        }
    ), [navigate]);

    return(
        <div style={{display: "flex"}}>
            <SidebarImpl/>
            <p>details</p>
        </div>
    );
}

export default Student;