import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';



const ForgetPassword = ({onSetUserType, onSetLoggedIn}) => {
    //// console.log(userType) //Restaurant Owner
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    newPassword: ""
  });

    let name, value;
    const handleInputs = (e)=>{
        // console.log(e)
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value});
    }

    const PostData = async(e) =>{
      e.preventDefault();
      
      const { name, email, newPassword } = user;
      const userType = "Customer";
      const requestBody = {
        name,
        email,
        userType,
        newPassword,
      };

      const res = await fetch("/updatePassword", {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      if(res.status === 422 || !data){
        // window.alert("Invalid Registration");
        console.log("Invalid Registration");
    }else{
        // window.alert("Successfull Registration");
        console.log("Password Reset Successfully");
        onSetUserType('Customer');
        onSetLoggedIn(true)
        navigate('/')
      }
    }
  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2 className="brown-text">Forget Password</h2>
        <Form method='POST'>
          <Form.Group controlId="formFullName">
            <Form.Label className="brown-text1">Full Name</Form.Label>
            <Form.Control type="text" name = "name"  value={user.name} onChange ={handleInputs} placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className="brown-text1">Email address</Form.Label>
            <Form.Control type="email" name = "email" value={user.email} onChange ={handleInputs} placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formPassword"> 
            <Form.Label className="brown-text1">New Password</Form.Label> 
            <Form.Control type="password" name="newPassword" value={user.newPassword} onChange={handleInputs} placeholder="Enter new password" />
          </Form.Group>

          {/* <div className='container'>
            <h5>User Type : {userType} </h5>
          </div> */}

          <Button id='bbtn' type="submit" className="login-button" onClick={PostData} fdprocessedid="p7nca5" >
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;

