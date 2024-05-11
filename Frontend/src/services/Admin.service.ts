import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { StudentDto } from "../models/StudentDto";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8081/api/";

export default class AdminService{

    private navigate = useNavigate();

    private getCurrentUserToken(){
        const userStr = localStorage.getItem("admin");
        
        if(userStr){
        const user = JSON.parse(userStr);
        return user.authenticationToken;
        }

    }

    getCurrentUser(){
        const userStr = localStorage.getItem("admin");
        
        if(userStr){
        return JSON.parse(userStr);
        }
    }
   
    login(loginRequest: LoginRequest){
        return axios.post(API_URL + "auth/login", loginRequest)
        .then(
            (response) => {
                    if(response.data){
                        localStorage.setItem("admin", JSON.stringify(response.data));
                        return response.data
                    }
                    return response;
            },(error) => {
                console.error(error);
            }
    
    )
    }

    addStudent(student: StudentDto){
        return axios.post(API_URL + "student/add", student, {
            headers: {"Authorization" : `Bearer ${this.getCurrentUserToken()}`}
        })
        .then(
            (response ) => {
                    if(response.data){
                        console.log(response.data);
                    }
                    return response;
            }, (error) => {
                console.error(error);
            }
        )
    }

    getStudents(){
        return axios.get(API_URL + "student/all", {
            headers: {"Authorization" : `Bearer ${this.getCurrentUserToken()}`}
        })
        .then(
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

    logout(){
        localStorage.clear();
        this.navigate("/login");
    }
}