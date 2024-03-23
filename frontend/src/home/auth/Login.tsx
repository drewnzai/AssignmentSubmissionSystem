import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';


interface UserData {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: string;
}

// Define interface for the response
interface APIResponse {
  message: string;
  statusCode: number;
  data: UserData; // Use the UserData interface for the data field
  successful: boolean;
}


const Login = (props:any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [response1, setResponse1] = useState<APIResponse | null>(null);

  const navigate = useNavigate();

  const onButtonClick = () => {

   login(username, password);        


}

const login = async (nname: string, pass:string) => {
  try {
    const requestBody = {
      username: nname,
      password: pass
    };


    const response: AxiosResponse<APIResponse> = await axios.post("http://localhost:8080/api/auth/login", requestBody);
    
    console.log(response.data);

    setResponse1(response.data);
    
    console.log(response1);

    }
     catch (error) {
 
      console.error('Error:', error);

    }

  
    
      
}



  return (
    
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
       
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
       
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
      
  );
};

export default Login;
