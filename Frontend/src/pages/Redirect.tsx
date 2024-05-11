import { useNavigate } from "react-router-dom";
import AdminService from "../services/Admin.service";
import { useEffect } from "react";

export default function Redirect(){
    const adminService = new AdminService();

    const navigate = useNavigate();

    const admin = adminService.getCurrentUser();

    useEffect(() => {
        if(admin){
            navigate("/admin/home");
        }else{
            navigate("/login")
        }
    }, []);
    

    return (<></>);
}