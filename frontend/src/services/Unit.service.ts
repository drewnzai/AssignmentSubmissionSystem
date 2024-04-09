import axios from "axios";
import authHeader from "../auth/auth.header";
import AuthService from "./Auth.service";

const API_URL = "http://localhost:8080/api/unit";

export default function UnitService(){

    let userDetails = AuthService.getCurrentUser();


}