import { useEffect } from "react";
import AuthService from "../../services/Auth.service";
import LecAuthService from "../../services/LecAuth.service";
import AdAuthService from "../../services/AdAuth.service";
import { useNavigate } from "react-router-dom";

function Redirect(){
    const authService = new AuthService();
    const lecService = new LecAuthService();
    const admService = new AdAuthService();

    const navigate = useNavigate();


    useEffect(() => {
        const stu: any | null = authService.getCurrentUser();
        const lec: any | null = lecService.getCurrentUser();
        const adm: any | null = admService.getCurrentUser();

        if(adm){
            navigate("/adminDashboard");
        }
        else if(lec){
            navigate("/lecturerDashboard");
        }
        else if(stu){
            navigate("/home");
        }
        else{
            navigate("/login");
        }
    },[]);

    return(
        <></>
    );
}

export default Redirect;