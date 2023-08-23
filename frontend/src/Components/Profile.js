import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Profile = ({onSetLoggedIn, onSetLocation}) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({    
    name: 'jhon'
   });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch user's profile data from the backend API
        const response = await fetch('/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // Set the token in the Authorization header
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else if (response.status === 401) {
          navigate('/login'); // Redirect to login page if not authenticated
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileData();
  }, [navigate]);

  if(profileData){
    console.log(profileData.location)
    onSetLocation(profileData.location)
  }
  const handleLogout = async () => {
    try {
      // Call the backend API to logout
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') // Set the token in the Authorization header
        },
      });
  
      if (response.ok) {
        // Clear the token from local storage
        localStorage.removeItem('token');
        // Navigate to the login page
        onSetLoggedIn(false);
        navigate('/login');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-container">
      <div className="editBtn">
        <p className="profile-heading">User Profile</p>
      </div>
      <div className="profile-info" >
            <div className="profile-box">
              <div className="content">
                <strong>Name:</strong> {profileData.name}
              </div>
            </div>
            <div className="profile-box">
              <div className="content">
                <strong>Email:</strong> {profileData.email}
              </div>
            </div>
            <div className="profile-box">
              <div className="content">
                <strong>Phone no:</strong> {profileData.phone}
              </div>
            </div>
            <div id="loc" className="profile-box">
              <div className="content">
                <strong>Location:</strong> {profileData.location}
              </div>
            </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
