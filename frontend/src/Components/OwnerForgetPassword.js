import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';



const OwnerForgetPassword = ({onSetUserType, onSetLoggedIn}) => {
    //// console.log(userType) //Restaurant Owner
  const navigate = useNavigate();
 
  const [user, setUser] = useState({
    restaurantName: "",
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
      
      const { restaurantName, email, newPassword } = user;
      const userType = "Restaurant Owner"
      const requestBody = {
        restaurantName,
        email,
        userType,
        newPassword,
      };

      const res = await fetch("/updateOwnPassword", {
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
        console.log("Reset Password Successfully");
        onSetUserType('Restaurant Owner');
        onSetLoggedIn(true);
        navigate('/')
      }
    }
  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2 className="brown-text">Onwer Forget Password</h2>
        <Form method='POST'>
          <Form.Group controlId="formFullName">
            <Form.Label className="brown-text1">Restaurant Name</Form.Label>
            <Form.Control type="text" name="restaurantName" value={user.restaurantName}onChange={handleInputs}placeholder="Enter your restaurant name"/>
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

export default OwnerForgetPassword;

