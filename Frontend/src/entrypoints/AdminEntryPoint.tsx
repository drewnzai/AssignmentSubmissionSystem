import {Navigate, Outlet} from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminEntryPoint(){
    const user: any | null = localStorage.getItem("admin");

    return(
        user ?  <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Topbar/>
            <Outlet/> 
        </main>
        
        </div>
        : <Navigate to={"/login"}/>
    );
}