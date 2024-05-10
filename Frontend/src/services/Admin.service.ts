import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";

const API_URL = "http://localhost:8081/api/";

export default class AdminService{
    login(loginRequest: LoginRequest){
        return axios.post(API_URL + "auth/login", loginRequest)
        .then(
            (response) => {
                    if(response.data){
                        console.log(response.data);
                        localStorage.setItem("admin", JSON.stringify(response.data));
                        return response.data
                    }
                    return response;
            },(error) => {
                console.error(error);
            }
    
    )
    }
}