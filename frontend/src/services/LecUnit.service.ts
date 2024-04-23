import { MiscRequest } from "../models/MiscRequest";
import { Unit } from "../models/Unit";
import LecAuthHeader from "../auth/LecAuth.header";
import LecAuthService from "./LecAuth.service";
import axios from "axios";

const API_URL = "http://localhost:8081/api/unit/lecturer";

export default class LecUnitService{
    getAssignedUnits(){
        const authService = new LecAuthService();
        let userDetails = authService.getCurrentUser();

    const miscRequest: MiscRequest = {
        data: userDetails.email
    };
    
    let units: Unit[];

    return axios.post(API_URL, miscRequest, {headers: LecAuthHeader()})
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

    getUnitsFromStorage(){
    const units = localStorage.getItem("units");
    if (units) return JSON.parse(units);
        
    return null;
    }
}

