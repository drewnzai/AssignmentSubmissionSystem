import {useNavigate} from "react-router-dom";
import AdminService from "../services/Admin.service";
import {useEffect} from "react";
import LecturerService from "../services/Lecturer.service";
import StudentService from "../services/Student.service";

export default function Redirect(){
    const adminService = new AdminService();
    const lecturerService = new LecturerService();
    const studentService = new StudentService();

    const navigate = useNavigate();

    const admin = adminService.getCurrentUser();
    const lecturer = lecturerService.getCurrentUser();
    const student = studentService.getCurrentUser();

    useEffect(() => {
        if(admin){
            navigate("/admin/home");
        }
        else if(lecturer){
            navigate("/lecturer/home");
        }
        else if(student){
            navigate("/student/home");
        }
        else{
            navigate("/login")
        }
    }, []);
    

    return (<></>);
}