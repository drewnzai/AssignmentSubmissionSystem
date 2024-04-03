import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginRequest{
    registration: string;
    password: string;
}


function Login(props: any){

    const [loginRequest, setLoginRequest] = useState<LoginRequest>({ registration: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        //   const response = await axios.post('http://localhost:8080/api/auth/login', loginRequest);
        //   console.log(response.data);
        
            console.log(loginRequest);

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
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <a href="/forgot-password">Forgot password?</a>
      </form>
    </div>
  );
}

export default Login;