import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/Auth.service";
import { LoginRequest } from "../../../models/LoginRequest";
import Navbar from "../../../components/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import AdAuthService from "../../../services/AdAuth.service";
import LecAuthService from "../../../services/LecAuth.service";



function Login(props: any){

  const authService = new AuthService();
  const lecService = new LecAuthService();
  const admService = new AdAuthService();

  const navigate = useNavigate();
 
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({ registration: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
        
           authService.login(loginRequest)
           .then(
            () => {
              toast.success('Logged In successfully!');
              navigate("/home")

            },
            (error) => {
              toast.error("Wrong user details");
              
            });

      
        } catch (error) {
          console.error('Login failed:', error);
          // Handle error (e.g., show an error message)
        }
      };

      useEffect(() => {
        const stu: any | null = authService.getCurrentUser();
        const lec: any | null = lecService.getCurrentUser();
        const adm: any | null = admService.getCurrentUser();

        if(adm){
            navigate("/adminDashboard");
        }
        else if(lec){
            navigate("/lecturerDashboard");
        }
        else if(stu){
            navigate("/home");
        }
    },[navigate]);

  return (
    <div>
     <Navbar/>
   <div className="login-container">
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="input-group">
          <label htmlFor="registration">Registration Number</label>
          <input type="text" 
          id="registration" 
          name="registration" 
          value={loginRequest.registration} onChange={handleInputChange} 
          pattern="[A-Z]?|[A-Z]P?\d{2}/\d{5}/\d{2}"
          required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={loginRequest.password} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <a href="/forgot-password">Forgot password?</a>
      </form>
    </div>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Login;