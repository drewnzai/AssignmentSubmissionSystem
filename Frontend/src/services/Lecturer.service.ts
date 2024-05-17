import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { Assignment } from "../models/Assignment";
import { MiscRequest } from "../models/MiscRequest";

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

    private getCurrentUserEmail(){
        const userStr = localStorage.getItem("lecturer");
        
        if(userStr){
        const user = JSON.parse(userStr);
        return user.email;
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

    getAssignmentsFromUnit(misc: MiscRequest){
        return axios.post(API_URL + "assignment/delete", misc, {
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
    )
    }

    getSubmissions(){
        const misc: MiscRequest = {
            data: this.getCurrentUserEmail.toString()
        }

        return axios.post(API_URL + "submission/lecturer", misc, {
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
    )
        

    }

}