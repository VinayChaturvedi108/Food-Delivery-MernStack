// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import MenuItem from "./MenuItem";
// // import axios from 'axios'

// const MenuPage = ({onSetLoggedIn}) => {
//   const [extractedMenuItems, setExtractedMenuItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch data from backend API
//     const fetchMenuData = async () => {
//       try {
        
//         ////////////////////////////////////////////////////////////////////////
//         // Fetch menu item data from the backend API
//         const response = await fetch('/showMenuItem', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token') 
//           },
//         });
  
//         if (response.ok) {
//           // Parse the JSON response
//           const data = await response.json();
//           console.log(data); // Log the fetched data
//           setExtractedMenuItems(data); // Update state with fetched data
//         } else if (response.status === 401) {
//           navigate('/ownprofile'); // Redirect to login page if not authenticated
//         } else {
//           console.log('Error fetching menu items:', response.statusText); // Log other error statuses
//         }
//       } catch (error) {
//         console.error('Error fetching menu items:', error); // Log any exceptions
//       }
//     };
//     fetchMenuData();
//   }, [navigate]);

//   return (
//     <div className="menu-page">
//       {/* Restaurant Info */}
//       <div className="restaurant-info">
//         <h1>Restaurant Name</h1>
//         <span className="opening-hours">Opening - Closing Time</span>
//       </div>
//       {/* Menu Items */}
//       <div className="menu-items-container">
//         {extractedMenuItems.map((item, index) => (
//           <MenuItem key={index} item={item} onSetLoggedIn={onSetLoggedIn} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MenuPage;
///////////////////////////////////////////////////////////////////////////////////////



