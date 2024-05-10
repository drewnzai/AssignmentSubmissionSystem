import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoutes(){
    const user: any | null = localStorage.getItem("admin");

    return(
        user ? <Outlet/> : <Navigate to={"/login"}/>
    );
}