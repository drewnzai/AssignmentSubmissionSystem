import axios from "axios";
import { StudentDetails } from "../models/StudentDetails";
import { DetailsRequest } from "../models/DetailsRequest"
import authHeader from "../auth/auth.header";
import AuthService from "./Auth.service";


const API_URL = "http://localhost:8080/api/student";

class StudentService{
    
    
    getDetails(){

    const authService = new AuthService();
    
    let userDetails = authService.getCurrentUser();

    const detailsRequest: DetailsRequest = {
        registration: userDetails.registration
    }

    const studentDetails: StudentDetails = {
        fullName: "",
        registration: "",
        courseName: ""
    };

    

   return axios.post(API_URL, detailsRequest, {headers: authHeader()})
    .then(
        (response) => {

            if(response.data.registration){
            studentDetails.registration = response.data.registration;
            studentDetails.fullName = response.data.fullName;
            studentDetails.courseName = response.data.courseName;
            }

            return studentDetails;
        }
    );
        
    }
}

export default new StudentService();