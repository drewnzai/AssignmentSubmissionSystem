import React from 'react';
import "./Login.css";

import { FaUser, FaLock } from "react-icons/fa";

function Login(){
  return (
    <div className='wrapper'>
        <h1>Login</h1>
        
        <div className="input-box">
          <input type="text" placeholder='Registration Number' required/>
          <FaUser/>
        </div>
        
        <div className="input-box">
          <input type="password" placeholder='Password' required/>
          <FaLock/>
        </div>

        <button type="submit">Login</button>
    </div>
  );
}

export default Login;