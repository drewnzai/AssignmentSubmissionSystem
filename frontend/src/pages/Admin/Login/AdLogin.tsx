import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginRequest } from "../../../models/UserLoginRequest";
import AdAuthService from "../../../services/AdAuth.service";
import { toast, ToastContainer } from "react-toastify";

function AdLogin(){
  const authService = new AdAuthService();
  const navigate = useNavigate();
 
  const [loginRequest, setLoginRequest] = useState<UserLoginRequest>({ email: '', password: '' });

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
              navigate("/adminDashboard")

            },
            (error) => {
              toast.error("Wrong user details");
              
            }
          );

      
        } catch (error) {
          console.error('Login failed:', error);
          // Handle error (e.g., show an error message)
        }
      };

    return(
        <div className="login-container">
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Administrator Sign In</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={loginRequest.email} onChange={handleInputChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={loginRequest.password} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <a href="/forgot-password">Forgot password?</a>
      </form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
    );
}

export default AdLogin;