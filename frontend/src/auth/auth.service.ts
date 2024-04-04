import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../models/LoginRequest";

const API_URL = "http://localhost:8080/api/auth/";

const navigate = useNavigate();

class AuthService {
  login(loginRequest: LoginRequest) {
    
    return axios
      .post(API_URL + "login", loginRequest)
      .then(response => {
        if (response.data.authenticationToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/home");
        }

        
      });
  }

  logout() {
    localStorage.removeItem("user");
  }


  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
