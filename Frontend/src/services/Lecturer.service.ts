import axios from "axios";
import {LoginRequest} from "../models/LoginRequest";
import {Assignment} from "../models/Assignment";
import {MiscRequest} from "../models/MiscRequest";
import {Submission} from "../models/Submission";
import {useNavigate} from "react-router-dom";

const API_URL = "http://localhost:8081/api/";

export default class LecturerService{

    private navigate = useNavigate();
    
    login(loginRequest: LoginRequest){
        return axios.post(API_URL + "auth/login", loginRequest)
        .then(
            (response) => {
                    if(response.data){
                        localStorage.clear();
                        localStorage.setItem("lecturer", JSON.stringify(response.data));
                        return response.data
                    }
                    return response;
            },(error) => {
                console.error(error);
            }
    
    )
    }

    getCurrentUserToken(){
        const userStr = localStorage.getItem("lecturer");
        
        if(userStr){
        const user = JSON.parse(userStr);
        return user.authenticationToken;
        }

    }

    getCurrentUserEmail(){
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

    deleteAssignment(title: string){
        const misc: MiscRequest = {
            data: title
        }
        
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
    )}

    getAssignedUnits(){
     const misc: MiscRequest = {
            data: this.getCurrentUserEmail().toString()
        }

     return axios.post(API_URL + "unit/lecturer", misc, {
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

    getAssignmentsFromUnit(code: string){
        const misc: MiscRequest = {
            data: code
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

    getAllSubmissions(){
        const misc: MiscRequest = {
            data: this.getCurrentUserEmail().toString()
        }

        return axios.post(API_URL + "submission/lecturer", misc, {
            headers: {"Authorization" : `Bearer ${this.getCurrentUserToken()}`
    }}).then(
        (response) => {
            if(response.data){
                console.log(response.data);
                return (response.data);
            }
            return response;
    }, (error) => {
        console.error(error);
    }
    )}

    getAllSubmissionsFromAssignment(assignmentTitle: string){
        const misc: MiscRequest = {
            data: assignmentTitle
        }

        return axios.post(API_URL + "submission/assignment", misc, {
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

    updateSubmission(submission: Submission){
        return axios.post(API_URL + "submission/update", submission, {
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

    getSubmissionFile(path: string){
        const misc: MiscRequest= {
            data: path
        }

        axios.post(API_URL + "file/download", misc, {
            headers: {"Authorization" : `Bearer ${this.getCurrentUserToken()}`},
            responseType: "blob"
        }).then(
            (response) => {
            
           const fileName = path.replace("/", "_") + ".zip";
            
           console.log(fileName);
        
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

            }, (error) => {
                console.error("Failed to Download File", error);
            }
        )
    }

    logout(){
        localStorage.clear();
        this.navigate("/login");
    }

}