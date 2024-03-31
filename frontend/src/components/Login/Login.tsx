import React, { useState } from 'react';
import "./Login.css";
import { EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import { InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';


function Login(){

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

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