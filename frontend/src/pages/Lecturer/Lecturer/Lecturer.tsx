import { useEffect, useState } from "react";
import LecSidebar from "../../../components/Sidebar/LecSidebar";
import { LecturerDetails } from "../../../models/LecturerDetails";
import LecturerService from "../../../services/Lecturer.service";
import { useNavigate } from "react-router-dom";
import LecAuthService from "../../../services/LecAuth.service";
import Loader from "../../../components/Loader/Loader";
import "./Lecturer.css";

function Lecturer(){
    const authService = new LecAuthService();
    const lecturerService = new LecturerService();
    const navigate = useNavigate();

    const [data, setData] = useState<LecturerDetails>({fullName: "", unitCodes: []});
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            const currentUser: any | null = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }
      
      setTimeout(
        () => {
          lecturerService.getDetails()
          .then(
            (response: LecturerDetails) => {
              setData(response);
              setLoading(false);
            }
          );
        }
      , 3000);


        }
        ,[]);

        if(loading){
            return(
              <div className="container">
                <Loader/>
              </div>
            );
          }
          
    return(
        <div>
            <LecSidebar/>

            <div className="person-details">
      <h1>{data.fullName}</h1>
      <h2>Unit Codes:</h2>
      <ul>
        {data.unitCodes.map((code, index) => (
          <li key={index}>{code}</li>
        ))}
      </ul>
    </div>
            </div>
    );
}

export default Lecturer;