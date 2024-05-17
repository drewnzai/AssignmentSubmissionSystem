import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { Assignment } from "../models/Assignment";

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

    createAssignment(assignment: Assignment){
        return axios.post(API_URL + "assignment", assignment, {
            headers: {"Authorization" : `Bearer ${this.getCurrentUserToken()}`
    }}).then(
        (response) => {
            if(response.data){
                return (response.data);
            }
            return response;
    }, (error) => {
        console.error(error);
    }
    )}

    deleteAssignment(assignment: Assignment){
        return axios.post(API_URL + "assignment/delete", assignment, {
            headers: {"Authorization" : `Bearer ${this.getCurrentUserToken()}`
    }}).then(
        (response) => {
            if(response.data){
                return (response.data);
            }
            return response;
    }, (error) => {
        console.error(error);
    }
    )}

    

}