import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/Auth.service";
import { LoginRequest } from "../../models/LoginRequest";



function Login(props: any){

  const navigate = useNavigate();
 
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({ registration: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
        
           AuthService.login(loginRequest)
           .then(
            () => navigate("/")
           );

      
        } catch (error) {
          console.error('Login failed:', error);
          // Handle error (e.g., show an error message)
        }
      };

  return (
   <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="input-group">
          <label htmlFor="registration">Registration Number</label>
          <input type="text" id="registration" name="registration" value={loginRequest.registration} onChange={handleInputChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={loginRequest.password} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <a href="/forgot-password">Forgot password?</a>
      </form>
    </div>
  );
}

export default Login;