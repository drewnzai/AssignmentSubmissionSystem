import axios from "axios";
import AuthHeader from "../auth/Auth.header";
import AuthService from "./Auth.service";
import { Unit } from "../models/Unit";

const API_URL = "http://localhost:8080/api/unit";

export default class UnitService{

    getUnitsFromCourse(){

    const authService = new AuthService();

    let userDetails = authService.getCurrentUser();
    
    let units: Unit[];

  return axios.get(API_URL + "/" + userDetails.courseName, {headers: AuthHeader()})
    .then(
        (response) => {
            
            if(response.data){
                console.log(response.data);
                units = response.data;
            }

            return units;
        }
    );

    }


}