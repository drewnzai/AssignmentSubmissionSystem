import axios from "axios";
import LecAuthHeader from "../auth/LecAuth.header";
import { MiscRequest } from "../models/MiscRequest";
import LecAuthService from "./LecAuth.service";

const API_URL = "http://localhost:8081/api/assignment";

export default class LecAssignmentService{

    addAssignment(assignment: any){
        return axios.post(API_URL, assignment, {headers: LecAuthHeader()})
    .then(
        (response) => {
            return response.data;
        }
    );
    }

    deleteAssignment(assignment: any){
        return axios.post(API_URL + "/" + "delete", assignment, {headers: LecAuthHeader()})
    .then(
        (response) => {
            return response.data;
        }
    );
    }

    getAllAssignments(){
        const authService = new LecAuthService();
        const currentUser: any | null = authService.getCurrentUser();

        const miscRequest: MiscRequest = {
            data: currentUser.email
        }
        return axios.post(API_URL + "/" + "lecturer", miscRequest, {headers: LecAuthHeader()})
        .then(
            (response) => {
                return response.data
            }
        );
    }

}