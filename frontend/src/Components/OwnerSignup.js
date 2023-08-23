import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import { NavLink, useNavigate} from 'react-router-dom';


const OwnerSignup = ({onSetUserType, onSetLoggedIn}) => {
  const navigate = useNavigate();
    const [owner, setOwner] = useState({
        restaurantName:"", phoneNumber:"", email:"", password:"", cpassword:"", state: "", district: "", area: "",deliveryTime:"", openingTime:"", closingTime:"", profileImg:"" 
    });
    let name, value;
    const handleInputs = (e)=>{
        // console.log(e)
        name = e.target.name;
        value = e.target.value;

        setOwner({...owner, [name]: value});
    }

    const PostData = async(e) =>{
      e.preventDefault();

      const {restaurantName, phoneNumber, email, password, cpassword, state, district, area, deliveryTime, openingTime, closingTime, profileImg } = owner;

      const userType = "Restaurant Owner"
      const location = `${area}, ${district}, ${state}`;

      const requestBody = {
        restaurantName, phoneNumber, email, password, cpassword, location,deliveryTime, openingTime, closingTime, profileImg, userType
      };
      const res = await fetch("/ownregister", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();
      if(res.status === 422 || !data){
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      }else{
        // window.alert("Successfull Registration");
        console.log("Successfull Registration");
        onSetUserType('Restaurant Owner');
        onSetLoggedIn(true);
        navigate('/')
    }
}
  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2 className="brown-text">Owner Registration</h2>
        <Form method='POST'>
          <Form.Group controlId="formFullName">
            <Form.Label className="brown-text1">Full Name</Form.Label>
            <Form.Control type="text" name = "restaurantName"  value={owner.restaurantName} onChange ={handleInputs} placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className="brown-text1">Email address</Form.Label>
            <Form.Control type="email" name = "email" value={owner.email} onChange ={handleInputs} placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label className="brown-text1">Phone Number</Form.Label>
            <Form.Control type="tel" name = "phoneNumber" value={owner.phoneNumber} onChange ={handleInputs} placeholder="Enter phone number" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label className="brown-text1">Password</Form.Label>
            <Form.Control type="password" name = "password" value={owner.password} onChange ={handleInputs} placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label className="brown-text1">Confirm Password</Form.Label>
            <Form.Control type="password" name = "cpassword" value={owner.cpassword} onChange ={handleInputs} placeholder="Confirm password" />
          </Form.Group>

          <Form.Group controlId="formState">
            <Form.Label className="brown-text1">State</Form.Label>
            <Form.Control type="text" name="state" value={owner.state} onChange={handleInputs} placeholder="Enter your state" />
          </Form.Group>

          <Form.Group controlId="formDistrict">
            <Form.Label className="brown-text1">District/City</Form.Label>
            <Form.Control type="text" name="district" value={owner.district} onChange={handleInputs} placeholder="Enter your district/city" />
          </Form.Group>

          <Form.Group controlId="formArea">
            <Form.Label className="brown-text1">Area/Locality</Form.Label>
            <Form.Control type="text" name="area" value={owner.area} onChange={handleInputs} placeholder="Enter your area/locality" />
          </Form.Group>

          <Form.Group controlId="formDeliveryTime">
            <Form.Label className="brown-text1">Delivery Time</Form.Label>
            <Form.Control type="text" name="deliveryTime" value={owner.deliveryTime} onChange={handleInputs} placeholder="Enter your deliveryTime" />
          </Form.Group>

          <Form.Group controlId="formOpeningTime">
            <Form.Label className="brown-text1">OpeningTime</Form.Label>
            <Form.Control type="text" name='openingTime' value={owner.openingTime} onChange ={handleInputs} placeholder="Enter your OpeningTime" />
          </Form.Group>

          <Form.Group controlId="formClosingTime">
            <Form.Label className="brown-text1">ClosingTime</Form.Label>
            <Form.Control type="text" name='closingTime' value={owner.closingTime} onChange ={handleInputs} placeholder="Enter your ClosingTime" />
          </Form.Group>

          <Form.Group controlId="formMainItem">
            <Form.Label className="brown-text1">Profile Image</Form.Label>
            <Form.Control type="text" name='profileImg' value={owner.profileImg} onChange ={handleInputs} placeholder="Enter your profileImg" />
          </Form.Group>

          <Button type="submit" className="login-button" onClick={PostData} fdprocessedid="p7nca5" >
            Register</Button>

          <div className="signup">
            <NavLink to='/ownlogin' className='signup-link'>I am already register</NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OwnerSignup;
