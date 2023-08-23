import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import { NavLink, useNavigate} from 'react-router-dom';



const Signup = ({onSetUserType, onSetLoggedIn}) => {
  const navigate = useNavigate();
 
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    state: "",
    district: "",
    area: "",
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
      
      const { name, email, phone, password, cpassword, state, district, area } = user;

      const userType = "Customer"; // or "Restaurant Owner" depending on the button clicked
      const location = `${area}, ${district}, ${state}`;

      const requestBody = {
        name,
        email,
        phone,
        password,
        cpassword,
        location,
        userType,
      };

      const res = await fetch("/register", {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(requestBody),
      });



      const data = await res.json();
      if(res.status === 422 || !data){
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      }else{
        // window.alert("Successfull Registration");
        console.log("Successfull Registration");
        onSetUserType('Customer');
        onSetLoggedIn(true);
        navigate('/')
      }
    }
  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2 className="brown-text">Registration</h2>
        <Form method='POST'>
          <Form.Group controlId="formFullName">
            <Form.Label className="brown-text1">Full Name</Form.Label>
            <Form.Control type="text" name = "name"  value={user.name} onChange ={handleInputs} placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className="brown-text1">Email address</Form.Label>
            <Form.Control type="email" name = "email" value={user.email} onChange ={handleInputs} placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label className="brown-text1">Phone Number</Form.Label>
            <Form.Control type="tel" name = "phone" value={user.phone} onChange ={handleInputs} placeholder="Enter phone number" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label className="brown-text1">Password</Form.Label>
            <Form.Control type="password" name = "password" value={user.password} onChange ={handleInputs} placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label className="brown-text1">Confirm Password</Form.Label>
            <Form.Control type="password" name = "cpassword" value={user.cpassword} onChange ={handleInputs} placeholder="Confirm password" />
          </Form.Group>

          <Form.Group controlId="formState">
            <Form.Label className="brown-text1">State</Form.Label>
            <Form.Control type="text" name="state" value={user.state} onChange={handleInputs} placeholder="Enter your state" />
          </Form.Group>

          <Form.Group controlId="formDistrict">
            <Form.Label className="brown-text1">District/City</Form.Label>
            <Form.Control type="text" name="district" value={user.district} onChange={handleInputs} placeholder="Enter your district/city" />
          </Form.Group>

          <Form.Group controlId="formArea">
            <Form.Label className="brown-text1">Area/Locality</Form.Label>
            <Form.Control type="text" name="area" value={user.area} onChange={handleInputs} placeholder="Enter your area/locality" />
          </Form.Group>

          {/* <div className='container'>
            <h5>User Type : {userType} </h5>
          </div> */}

          <Button id='bbtn' type="submit" className="login-button" onClick={PostData} fdprocessedid="p7nca5" >
            Register
          </Button>

          <div className="signup">
            <NavLink to='/login' className='signup-link'>I am already register</NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

