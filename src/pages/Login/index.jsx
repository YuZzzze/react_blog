import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input ,Row ,Col ,PageHeader, message } from 'antd';
import { useNavigate } from 'react-router';
import Http from '../../api/api'
import './index.css'

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (formData) => {
    const userData = {
      username: formData.username.trim(),
      password: formData.password.trim()
    }

    Http('post','login',userData).then(res=>{
      if(res.data === true){
        // localStorage.setItem("userData",)
        localStorage.setItem("userData",JSON.stringify(userData))
        const data = localStorage.getItem("userData")
        console.log(JSON.parse(data));
        navigate('/',{replace: true})
      }else{
        message.error("用户名密码错误")
      }
    })
  };

  return (
    <Row type='flex' justify='center' align='middle' style={{height: '100vh'}}>
      <Col xs={18} sm={12} md={10} lg={8} xl={8} >
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        >
            <PageHeader
              className="site-page-header"
              title="YuZzzze Blog"

            />
          <Form.Item  
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

          </Form.Item>

          <Form.Item style={{textAlign: "center"}}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login