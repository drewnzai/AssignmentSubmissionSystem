import {Navigate, Outlet} from "react-router-dom";
import Sidebar from "../components/Lecturer/Sidebar";
import Topbar from "../components/Topbar";

export default function LecturerProtectedRoutes(){
    const lecturer: any | null = localStorage.getItem("lecturer");

    return(
        lecturer ? <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Topbar/>
            <Outlet/> 
        </main>
        
        </div> : <Navigate to={"/login"}/>
    );
}