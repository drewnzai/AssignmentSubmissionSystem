import React, { useState } from 'react';
import "./Login.css";
import { EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import { InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface LoginRequest{
  registration: string;
  password: string;
}


function Login(){

  const navigate = useNavigate();
  
  const onFinish = async (values: any) => {
  
    try {
  
    const loginRequest: LoginRequest = {
    registration: values.registration,
    password: values.password
  }
    
    const response = await axios.post("http://localhost:8080/api/auth/login", loginRequest);
    navigate("/dashboard");

  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="wrapper">
    <div className="pagecentre">
    <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
       <Form.Item
        name="registration"
        rules={[{ required: true, message: 'Please input your Registration Number!' }]}
      >
        <Input
        prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="Registration Number"
        suffix={
          <Tooltip title="Sample Registration Number format: A01/03124/23">
            <InfoCircleOutlined style={{
              color: "rgba(0, 0, 0, .45)"
            }}
            />
          </Tooltip>
        }
        />
      </Form.Item>
      
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          iconRender={
            (visible) => (
              visible? <EyeTwoTone /> : <EyeInvisibleOutlined/>
            )
          }
          />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
     </Form>
    </div>
    </div>
  );
}

export default Login;