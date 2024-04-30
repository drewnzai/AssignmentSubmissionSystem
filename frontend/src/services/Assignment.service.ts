import axios from "axios";
import AuthHeader from "../auth/Auth.header";
import {Assignment} from "../models/Assignment";
import {MiscRequest} from "../models/MiscRequest";
import AuthService from "./Auth.service";

const API_URL = "http://localhost:8080/api/assignment";


export default class AssignmentService{

    getPendingAssignments(){
    
    let assignments: Assignment[];
    
    const authService = new AuthService();
    
    let userDetails = authService.getCurrentUser();
    
    const miscRequest: MiscRequest = {
        data: userDetails.registration
    }

    return axios.post(API_URL, miscRequest, {headers: AuthHeader()})
    .then(
        (response) => {
            if(response.data){
            
                assignments = response.data;
            }

            return assignments;
        }
    );
}
}