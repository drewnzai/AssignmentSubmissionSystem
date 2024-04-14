import axios from "axios";
import AuthHeader from "../auth/Auth.header";
import { MiscRequest } from "../models/MiscRequest";
import { Unit } from "../models/Unit";
import { useState } from "react";
import { Assignment } from "../models/Assignment";

const API_URL = "http://localhost:8080/api/assignment";

const units:Unit[] = JSON.parse(localStorage.getItem("units")!);


export default class AssignmentService{

    getPendingAssignments(){
    
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    
    const unit = units[1];

    const miscRequest: MiscRequest = {
        data: unit.code
    }
    
    //TO-DO implement this List<AssignmentDto> pendingAssignmentsByUnit(String unitCode)
    return axios.post(API_URL, miscRequest, {headers: AuthHeader()})
    .then(
        (response) => {
            if(response.data){
                setAssignments(response.data);
            }
            return assignments;
        }
    );
}
}