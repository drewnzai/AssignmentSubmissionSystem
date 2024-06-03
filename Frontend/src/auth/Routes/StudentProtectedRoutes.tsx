import {Navigate, Outlet} from "react-router-dom";
import Sidebar from "../../components/Student/Sidebar";
import Topbar from "../../components/Topbar";

export default function StudentProtectedRoutes(){
    const user: any | null = localStorage.getItem("student");

    return(
        user ? <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Topbar/>
            <Outlet/> 
        </main>
        
        </div> : <Navigate to={"/login"}/>
    );
}