import axios from "axios";
import { MiscRequest } from "../models/MiscRequest";
import { Submission } from "../models/Submission";
import AuthHeader from "../auth/Auth.header";
import AuthService from "./Auth.service";

const API_URL = "http://localhost:8081/api/submission";

export default class SubmissionService{
    getAllSubmission(){
        let submissions: Submission[];

        const authService = new AuthService();
        const user = authService.getCurrentUser();

        const miscRequest: MiscRequest = {
            data: user.registration
        }

        return axios.post(API_URL, miscRequest, {headers: AuthHeader()})
        .then(
            (response) => {
                if(response.data){
                    submissions = response.data;
                }

                return submissions;
            }
        );
    }

}