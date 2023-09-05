import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Menu from './Menu';
// import MenuPage from './MenuPage';
import AddMenuPopup from './AddMenuPopup';
import { useNavigate } from 'react-router-dom';
import MenuPage from './MenuPage';
import Main from './Main';


const OwnProfile = ({onSetLoggedIn}) => {
  const navigate = useNavigate();
  const [isAddMenuPopupOpen, setAddMenuPopupOpen] = useState(false);
  const [profileData, setProfileData] = useState({email:"jho@example.com"});

  // Rest of the component code

  // useEffect(() => {
    //   const fetchProfileData = async () => {
  //     try {
  //       // Fetch user's profile data from the backend API using fetch()
  //       const response = await fetch('/ownprofile', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // 'Authorization': 'Bearer ' + YOUR_JWT_TOKEN, // Replace YOUR_JWT_TOKEN with the actual JWT token if required
  //         },
  //         credentials: 'include', // Include cookies in the request
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       setProfileData(data);
  //     } catch (error) {
  //       console.log(error);
  //       if (error.response && error.response.status === 401) {
  //         navigate('/ownlogin'); // Redirect to login page if not authenticated
  //       }
  //     }
  //   };
  //   fetchProfileData();
  // }, [navigate]);
  useEffect(() => {
  const fetchProfileData = async () => {
    try {
      // Fetch user's profile data from the backend API
      const response = await fetch('/ownprofile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') // Set the token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProfileData(data);
      } else if (response.status === 401) {
        navigate('/ownlogin'); // Redirect to login page if not authenticated
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchProfileData();
}, [navigate]);

const handleLogout = async () => {
  try {
    // Call the backend API to logout
    const response = await fetch('/ownlogout', {
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
      navigate('/ownlogin');
    } else {
      console.log('Logout failed');
    }
  } catch (error) {
    console.log(error);
  }
};
// const menu =()=>{
//   navigate('/showMenuItem')
// }
const handleAddMenu = () => {
  setAddMenuPopupOpen(true);
};
return (
    <div className="profile-container">
    {/* // <div className={`profile-container${isAddMenuPopupOpen ? ' blur' : ''}`}> */}
      <div className="editBtn">
        <p className="profile-heading">Owner Profile</p>
        {profileData.email !== 'jho@example.com' &&
          (<button className="add-menu-button" style={{borderRadius: "5px", height: "35px", marginLeft:"580px", borderColor:"blue", borderWidth:"2px", backgroundColor:"linear-gradient(to bottom, to top, to left, to right, #1E90FF, #00BFFF"}} onClick={handleAddMenu}>
            Add Menu
          </button>)
        }
        {/* {profileData.email !== 'jho@example.com' &&
          (<button onClick={menu} style={{borderRadius: "5px", height: "35px", marginLeft:"580px", borderColor:"blue", borderWidth:"2px", backgroundColor:"linear-gradient(to bottom, to top, to left, to right, #1E90FF, #00BFFF"}} >
            Menu
            <div style={{display:"none"}}>
              <MenuPage name={profileData.restaurantName}/>
            </div>
          </button>)
        } */}
      </div>
      
      <div className="profile-info">
            <div className="profile-box">
              <div className="content">
                <strong>Restaurant Name:</strong> {profileData.restaurantName}
              </div>

            </div>
            <div className="profile-box">
              <div className="content">
                <strong>Email:</strong> {profileData.email}
              </div>
              {/* <div style={{display:"none"}}>
                <Menu ownerEmail={profileData.email}/>
              </div> */}
            </div>
            <div className="profile-box">
              <div className="content">
                <strong>Phone no:</strong> {profileData.phoneNumber}
              </div>
            </div>
            <div id="loc" className="profile-box">
              <div className="content">
                <strong>Location:</strong> {profileData.location}
              </div>
            </div>
            <div className="profile-box">
              <div className="content">
                <strong>Opening Time:</strong> {profileData.openingTime}
              </div>
            </div>
            <div className="profile-box">
              <div className="content">
                <strong>Closing Time:</strong> {profileData.closingTime}
              </div>
            </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      {isAddMenuPopupOpen ? (
        <AddMenuPopup
          onClose={() => setAddMenuPopupOpen(false)}
          onSave={(menuItemData) => {
            // Handle saving the new menu item data here
            console.log('New Menu Item:', menuItemData);
            setAddMenuPopupOpen(false);
          }}
          email = {profileData.email}
        />
      )&&(<Main email = {profileData.email}/>): null}
    </div>
  );
}


export default OwnProfile;