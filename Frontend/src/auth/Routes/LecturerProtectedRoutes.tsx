import { Navigate, Outlet } from "react-router-dom";

export default function LecturerProtectedRoutes(){
    const lecturer: any | null = localStorage.getItem("lecturer");

    return(
        lecturer ? <Outlet/> : <Navigate to={"/login"}/>
    );
}