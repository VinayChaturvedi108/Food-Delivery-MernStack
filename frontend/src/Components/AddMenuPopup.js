import React, { useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import Menu from './Menu';


const AddMenuPopup = ({email, onClose, onSave }) => {
  const [imageLink, setItemImage] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');


  const handleSave = async () => {
    try {
      // Call the onSave function with the new menu item data
      onSave({email, imageLink, itemName, itemPrice });

      // Send the HTTP POST request to the backend API
      const response = await fetch('/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') // Set the token in the Authorization header
        },
        body: JSON.stringify({
          email,
          imageLink,
          itemName,
          itemPrice,
        }),
      });

      // The response will contain the saved menu item data from the backend
      const savedMenuItem = await response.json();
      // console.log('Saved menu item:', savedMenuItem.email, savedMenuItem.imageLink, savedMenuItem.itemName, savedMenuItem.itemPrice);
      console.log(savedMenuItem)
      // Optionally, you can close the popup after saving the item
      onClose();
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the HTTP request
    }
  };



  return (
    <div className="add-menu-popup">
      <div className="add-menu-popup-overlay" >

      <div className="add-menu-popup-content">
        <h2>Add Menu Item</h2>
        <label>
          Item Image Link:
          <input type="text" value={imageLink} onChange={(e) => setItemImage(e.target.value)} />
        </label>
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </label>
        <label>
          Item Price:
          <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
      </div>
    </div>
  );
};


export default AddMenuPopup;
