import axios from "axios";
import { MiscRequest } from "../models/MiscRequest";
import LecAuthHeader from "../auth/LecAuth.header";
import { Submission } from "../models/Submission";
import LecAuthService from "./LecAuth.service";

const API_URL = "http://localhost:8081/api/submission";

export default class LecSubmissionService{
    
    getAllSubmission(){
        let submissions: Submission[];

        const authService = new LecAuthService();
        const user = authService.getCurrentUser();

        const miscRequest: MiscRequest = {
            data: user.email
        }

        return axios.post(API_URL, miscRequest, {headers: LecAuthHeader()})
        .then(
            (response) => {
                if(response.data){
                    submissions = response.data;
                }

                return submissions;
            }
        );
    }

    modifySubmission(submission: Submission){
        return axios.post(API_URL + "/modify", submission, {headers: LecAuthHeader()})
        .then(
            (response) => {
                if(response.data)

                return response.data;
            }
        );
    }
}