
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';

// import './Login.css';

const Login = ({onSetUserType, onSetLoggedIn}) => {
  const navigate = useNavigate()
  ////**First we use state hook */
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  
  const loginUser = async (e) =>{
    e.preventDefault();
    
    const userType = "Custumer"; // Declearing  here usertype and during login try to match
    const requestBody = {
      email, 
      password,
      userType
    }
    const res = await fetch('/login', {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();

    if(res.status === 400 || !data){
      window.alert("Invalid Crediential");
    }else{
      // window.alert("Successfully Login");
      // console.log("Login Successfull ");
      onSetUserType('Customer');
      onSetLoggedIn(true);
      navigate('/')
    }

  } 

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Login</h2>
        <Form method='POST'>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className='lebel'>Email address</Form.Label>
            <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter email" className="input-field" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className='lebel'>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="input-field" />
          </Form.Group>
          <Button id='bbtn' variant="primary" type="submit" onClick={loginUser} className="login-button">
            Login
          </Button>
          <br></br>
          <div className="container">
          <div className='Hide'style={{display:"none"}}>
              <ForgetPassword userType={"Customer"}/>
            </div>
            <NavLink to='/updatePassword'>Forget Password -/</NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
// Login.js

