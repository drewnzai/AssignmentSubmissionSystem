import axios from "axios";
import AuthHeader from "../auth/Auth.header";
import { Assignment } from "../models/Assignment";
import { MiscRequest } from "../models/MiscRequest";
import { Unit } from "../models/Unit";

const API_URL = "http://localhost:8080/api/assignment";

const units:Unit[] = JSON.parse(localStorage.getItem("units")!);


export default class AssignmentService{

    getPendingAssignments(){
    
    let assignments: Assignment[];
    
    const unit = units[1];

    const miscRequest: MiscRequest = {
        data: unit.code
    }
    
    //TO-DO implement this List<AssignmentDto> pendingAssignmentsByUnit(String unitCode) to allow multiple units
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