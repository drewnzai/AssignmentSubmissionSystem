import {Navigate, Outlet} from "react-router-dom";

export default function StudentProtectedRoutes(){
    const user: any | null = localStorage.getItem("student");

    return(
        user ? <Outlet/> : <Navigate to={"/login"}/>
    );
}