import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { useNavigate } from "react-router-dom";
import { MiscRequest } from "../models/MiscRequest";

const API_URL = "http://localhost:8080/api/";

export default class StudentService{

    private navigate = useNavigate();
    
    login(loginRequest: LoginRequest){
        return axios.post(API_URL + "auth/login", loginRequest)
        .then(
            (response) => {
                    if(response.data){
                        localStorage.clear();
                        localStorage.setItem("student", JSON.stringify(response.data));
                        return response.data
                    }
                    return response;
            },(error) => {
                console.error(error);
            }
    
    )
    }

    logout(){
        localStorage.clear();
        this.navigate("/login");
    }

    private getCurrentUserToken(){
        const userStr = localStorage.getItem("student");
        
        if(userStr){
        const user = JSON.parse(userStr);
        return user.authenticationToken;
        }

    }

    private getCurrentUserCourse(){
        const userStr = localStorage.getItem("student");
        
        if(userStr){
        const user = JSON.parse(userStr);
        return user.course;
        }
    }

    private getCurrentUserRegistration(){
        const userStr = localStorage.getItem("student");
        
        if(userStr){
        const user = JSON.parse(userStr);
        return user.registration;
        }
    }

    getCurrentUser(){
        const userStr = localStorage.getItem("student");
        
        if(userStr){
        return JSON.parse(userStr);
        }
    }

    getCurrentUnits(){
        const misc: MiscRequest = {
            data: this.getCurrentUserCourse().toString()
        }

     return axios.post(API_URL + "unit", misc, {
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

    getAllPendingAssignments(){
        const misc: MiscRequest = {
            data: this.getCurrentUserRegistration().toString()
        }

     return axios.post(API_URL + "assignment", misc, {
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

    getAllPendingAssignmentsByUnit(unitCode: string){
        const misc: MiscRequest = {
            data: unitCode
        }

     return axios.post(API_URL + "assignment/unit", misc, {
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

    submitAssignment(formData: FormData){
        return axios.post(API_URL + "submission", formData, {
            headers: {
            "Authorization" : `Bearer ${this.getCurrentUserToken()}`,
            'Content-Type': 'multipart/form-data'
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

    getAllSubmissions(){
        const misc: MiscRequest = {
            data: this.getCurrentUserRegistration().toString()
        }

        return axios.post(API_URL + "submission/all", misc, {
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