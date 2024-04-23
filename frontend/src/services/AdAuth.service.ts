import axios from "axios";
import { UserLoginRequest } from "../models/UserLoginRequest";

const API_URL = "http://localhost:8081/api/auth/"

export default class LecAuthService{
    login(loginRequest: UserLoginRequest) {
    
        return axios
          .post(API_URL + "login", loginRequest)
          .then(response => {
            if (response.data.authenticationToken) {
              localStorage.setItem("admin", JSON.stringify(response.data));
            }
    
            return response.data;
          });
      }
    
      logout() {
        localStorage.removeItem("admin");
        localStorage.removeItem("units");
      }
    
    
      getCurrentUser() {
        const userStr = localStorage.getItem("admin");
        if (userStr) return JSON.parse(userStr);
    
        return null;
      }
    
}