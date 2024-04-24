import axios from "axios";
import AdAuthHeader from "../auth/AdAuth.header";
import { StudentDetails } from "../models/StudentDetails";
import { LecturerRequest } from "../models/LecturerRequest";
import { Unit } from "../models/Unit";

const API_URL = "http://localhost:8081/api/";


export default class AdminService{

    addStudent(student: StudentDetails){
        return axios.post(API_URL + "student/add", student, {headers: AdAuthHeader()})
        .then(
            (response) => {
                return response.data;
            }
        );
    }

    deleteStudent(student: StudentDetails){
        return axios.post(API_URL + "student/delete", student, {headers: AdAuthHeader()})
        .then(
            (response) => {
                return response.data;
            }
        );
    }

    addUnit(unit: Unit){
        return axios.post(API_URL + "unit/add", unit, {headers: AdAuthHeader()})
        .then(
            (response) => {
                return response.data
            }
        );
    }

    
    deleteUnit(unit: Unit){
            return axios.post(API_URL + "unit/delete", unit, {headers: AdAuthHeader()})
            .then(
                (response) => {
                    return response.data
                }
            );

    }

    addLecturer(lecturer: LecturerRequest){
        return axios.post(API_URL + "lecturer/add", lecturer, {headers: AdAuthHeader()})
        .then(
            (response) => {
                return response.data
            }
        );
    }

    deleteLecturer(lecturer: LecturerRequest){
        return axios.post(API_URL + "lecturer/delete", lecturer, {headers: AdAuthHeader()})
        .then(
            (response) => {
                return response.data
            }
        );
    }

    getSystemDetails(){
        return axios.get(API_URL + "/system", {headers: AdAuthHeader()})
        .then(
        (response) => {
            return response.data;
        }
        );
    }
}