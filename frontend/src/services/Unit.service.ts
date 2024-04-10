import axios from "axios";
import AuthHeader from "../auth/Auth.header";
import AuthService from "./Auth.service";
import {MiscRequest} from "../models/MiscRequest"
import { Unit } from "../models/Unit";

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
                console.log(response.data);
                units = response.data;
            }

            return units;
        }
    );

    }


}