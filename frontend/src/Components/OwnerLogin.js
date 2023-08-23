import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import OwnerForgetPassword from './OwnerForgetPassword';
// import './Login.css';

const OwnerLogin = ({onSetUserType, onSetLoggedIn}) => {
  const navigate = useNavigate()
  ////**First we use state hook */
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  
  const loginOwner = async (e) =>{
    e.preventDefault();
    const userType = "Restaurant Owner";
    const requestBody = {
      email, 
      password,
      userType
    }
    const res = await fetch('/ownlogin', {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    const data = await res.json();

    if(!data){
      window.alert("Invalid Crediential");
    }else if(data){
      // window.alert("Successfully Login");
      // console.log("Login Successfull ");
      onSetUserType('Restaurant Owner');
      onSetLoggedIn(true);
      navigate('/')
    }else{
      window.alert("Invalid Crediential");
    }
  } 


  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">OwnerLogin</h2>
        <Form method='POST'>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className='lebel'>Email address</Form.Label>
            <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter email" className="input-field" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className='lebel'>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="input-field" />
          </Form.Group>

          <Button id='bbtn' variant="primary" type="submit" onClick={loginOwner} className="login-button">
            Login
          </Button>
          <br></br>
          <div className="container">
            <div className='Hide'style={{display:"none"}}>
              <OwnerForgetPassword userType={"Restaurant Owner"}/>
            </div>
            <NavLink to='/updateOwnPassword'>Forget Password -/</NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OwnerLogin