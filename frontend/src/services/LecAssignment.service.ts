import axios from "axios";
import LecAuthHeader from "../auth/LecAuth.header";

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

}