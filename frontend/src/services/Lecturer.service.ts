import axios from "axios";
import { MiscRequest } from "../models/MiscRequest";
import { UserDetails } from "../models/UserDetails";
import LecAuthService from "./LecAuth.service";
import LecAuthHeader from "../auth/LecAuth.header";
import { LecturerDetails } from "../models/LecturerDetails";
import { LecturerDets } from "../models/Lecturer";

const API_URL = "http://localhost:8081/api/lecturer";

export default class LecturerService{

    getDetails(){

        const authService = new LecAuthService();
        
        let userDetails = authService.getCurrentUser();
    
        const detailsRequest:LecturerDets = {
            email: userDetails.email 
        }
    
        const details: LecturerDetails = {
            fullName: "",
            unitCodes: []
        };

        return axios.post(API_URL, detailsRequest, {headers: LecAuthHeader()})
    .then(
        (response) => {

            if(response.data.registration){
            details.unitCodes = response.data.unitCodes;
            details.fullName = response.data.fullName;
            }

            return details;
        }
    );
        
    }
    

}