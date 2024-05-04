import axios from "axios";
import AuthHeader from "../../auth/Auth.header";
import {MiscRequest} from "../../models/MiscRequest";
import {Unit} from "../../models/Unit";
import AuthService from "./Auth.service";

const API_URL = "http://localhost:8080/api/unit";

export default class UnitService{

    getUnitsFromCourse(){

    const authService = new AuthService();

    let userDetails = authService.getCurrentUser();

    const miscRequest: MiscRequest = {
        data: userDetails.course
    };
    
    let units: Unit[];

  return axios.post(API_URL, miscRequest, {headers: AuthHeader()})
    .then(
        (response) => {
            
            if(response.data){

                units = response.data;

                localStorage.setItem("units", JSON.stringify(units));
            }

            return units;
        }
    );

    }


}