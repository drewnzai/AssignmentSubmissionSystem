import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarImpl from "../../components/Sidebar/SidebarImpl";
import Loader from "../../components/Loader/Loader";
import Content from "../Content/Content";
import "./Home.css";

import AuthService from "../../services/Auth.service";
import UnitService from "../../services/Unit.service";

function Home(){

  const authService = new AuthService();
  const unitService = new UnitService();

  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  
  useEffect(
    () =>{
      const currentUser = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }

      setTimeout(
        () => {
          unitService.getUnitsFromCourse()
          .then(
            (response) => {
              setLoading(false);
            }
          );
        }
      , 3000);
      

    }, [navigate]
  );

  if(loading){
    return(
      <div className="loader">
        <Loader/>
      </div>
    );
  }
  
  return (
    <div style={{display: "flex"}}>
    <SidebarImpl/>
    <Content/>
    </div>
  );

  
}

export default Home;