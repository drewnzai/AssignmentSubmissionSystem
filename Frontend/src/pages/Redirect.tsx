import { useNavigate } from "react-router-dom";
import AdminService from "../services/Admin.service";
import { useEffect } from "react";
import LecturerService from "../services/Lecturer.service";

export default function Redirect(){
    const adminService = new AdminService();
    const lecturerService = new LecturerService();

    const navigate = useNavigate();

    const admin = adminService.getCurrentUser();
    const lecturer = lecturerService.getCurrentUser();

    useEffect(() => {
        if(admin){
            navigate("/admin/home");
        }
        else if(lecturer){
            navigate("/lecturer/home");
        }
        else{
            navigate("/login")
        }
    }, []);
    

    return (<></>);
}