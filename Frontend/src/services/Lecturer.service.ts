import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";

const API_URL = "http://localhost:8081/api/";

export default class LecturerService{
    login(loginRequest: LoginRequest){
        return axios.post(API_URL + "auth/login", loginRequest)
        .then(
            (response) => {
                    if(response.data){
                        localStorage.setItem("lecturer", JSON.stringify(response.data));
                        return response.data
                    }
                    return response;
            },(error) => {
                console.error(error);
            }
    
    )
    }

    private getCurrentUserToken(){
        const userStr = localStorage.getItem("lecturer");
        
        if(userStr){
        const user = JSON.parse(userStr);
        return user.authenticationToken;
        }

    }

    getCurrentUser(){
        const userStr = localStorage.getItem("lecturer");
        
        if(userStr){
        return JSON.parse(userStr);
        }
    }
}