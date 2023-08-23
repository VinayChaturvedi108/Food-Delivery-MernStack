// owner_registration.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Owner = require('../model/ownerSchema');
const Menu = require('../model/menuSchema')

// Register a new owner/restaurant
router.post('/ownregister', async (req, res) => {
    const {restaurantName, phoneNumber, email, password, cpassword, location,deliveryTime, openingTime, closingTime,profileImg, userType} = req.body;

    if(!restaurantName || !phoneNumber || !email || !password || !cpassword || !location || !deliveryTime || !openingTime || !closingTime || !profileImg || !userType){
        return res.status(422).json({ error: 'Please fill the information properly' });
    }
  try {

    // Check if the restaurant already exists with the same email
    const existingRestaurant = await Owner.findOne({ email });

    if (existingRestaurant) {
      return res.status(400).json({ error: 'Restaurant with this email already exists' });
    }else if (password !== cpassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }else{
        const newRestaurant = new Owner({ restaurantName, phoneNumber, email, password, cpassword, location,deliveryTime, openingTime, closingTime, profileImg, userType });
        const ownerSignup = await newRestaurant.save();

        if(ownerSignup){
          const token = jwt.sign({ _id: ownerSignup._id }, process.env.SECRET_KEY);
          res.cookie('jwt', token, { httpOnly: true });
            res.status(201).json({ message: 'Restaurant registered successfully', token });
        }else{
            res.status(500).json({error: "Owner's Registration Failed"})
        }
    }

    // Create a new restaurant

    // Generate auth token for the new restaurant owner
    // const token = await newRestaurant.generateAuthToken();

    // Save the restaurant details in the database

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

router.post('/ownlogin', async (req, res) => {
  try {
    const { email, password , userType} = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ error: 'Please Fill the data' });
    }

    const ownerLogin = await Owner.findOne({ email});

    if (!ownerLogin) {
      return res.status(404).json({ error: 'Invalid Credientials' });
    }

    const isMatch = await bcrypt.compare(password, ownerLogin.password);
    const isMatchToo = await bcrypt.compare(userType, ownerLogin.userType);

    if (!isMatch && !isMatchToo) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: ownerLogin._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    // Send a response with the success message and the token
    res.json({ message: 'User login successful', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});
//////////////////////////////////////////////////////////////////
////////////*****Middleware to verify the JWT token********//////
////////////////////////////////////////////////////////////////////
const verifyToken = (req, res, next)=>{
  const token = req.cookies.jwt;
  if(!token){
    return(res.status(403).json({error:'Access denied'}))
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
    if(err){
      return res.status(403).json({error: 'Invaild token'});
    }

    req.ownerId = decodedToken._id;
    next();
  });
}

router.post('/ownlogout', (req, res) => {
  res.clearCookie('jwt'); // Clear the JWT cookie to log out the user
  res.json({ message: 'Owner Logout successful' });
});

///////////////////////////////////////////////////////////////////
//////////////////*******OWNER Profile DATA********////////////////
//////////////////////////////////////////////////////*///////////
router.get('/ownprofile', verifyToken, async (req, res) => {
  try {
    // Fetch the user from the 'User' collection
    const owner = await Owner.findById(req.ownerId);
    if (!owner) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profileData = {
      restaurantName : owner.restaurantName,
      phoneNumber : owner.phoneNumber,
      email : owner.email,
      password : owner.password,
      location : owner.location,
      deliveryTime:owner.deliveryTime,
      openingTime:owner.openingTime, 
      closingTime : owner.closingTime
   };

    res.json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// backend/routes/menu.js

/////////////////////////////////////////////////////////
/////////// Route to add a new menu item//////////////
////////////////////////////////////////////////////////
router.post('/addMenuItem', async (req, res) => {
  const { email, itemImage, itemName, itemPrice } = req.body;

  try {
    // Verify the owner's email and password
    const owner = await Owner.findOne({ email });
    if (!owner ) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create a new menu item and associate it with the owner's details
    const newItem = new Menu({
      owner: owner._id,
      email,
      itemImage,
      itemName,
      itemPrice,
    });

    // Save the new menu item
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//////////////////////////////////////////////////////////////////
////////////////////////////Show Memu Item//////////////////////
////////////////////////////////////////////////////////////////////
router.get('/showMenuItem', async (req, res) => {
  const { email } = req.body;
  try {
    // Verify the owner's email and password
    const menuItems = await Menu.find({ email });
    
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ error: 'Menu items not found' });
    }
    
    const itemDetails = [];

    for (const item of menuItems) {
      if (item.email === email) {
        itemDetails.push({
          itemImage: item.itemImage,
          itemName: item.itemName,
          itemPrice: item.itemPrice, // Assuming you have a field named 'profileImg' in your database model
        });
      }
    }
    // Create a new array to store the extracted data
    // res.json(menuItems)
    // const extractedMenuItems = menuItems.map((item) => ({
    //   itemImage: item.itemImage,
    //   itemName: item.itemName,
    //   itemPrice: item.itemPrice,
    // }));

    res.json({itemDetails});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

///////////////////////////////////////////////////////////////////////////
///////////***************Update PassWord***************//////////////// 
///////////////////////////////////////////////////////////////////////////////
router.post('/updateOwnPassword', async (req, res) => {
  const { email, restaurantName, userType, newPassword } = req.body;

  try {
    // Find the user by matching email, name, and userType
    const user = await Owner.findOne({ email, restaurantName, userType });

    // Check if the user with provided credentials exists
    if (!user) {
      return res.status(401).json({ error: 'Incorrect credentials' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    user.cpassword = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

////////////////////////////////////////////////////////////////////////////////////////
///////////***************Get All Restaurant Name, items***************//////////////// 
//////////////////////////////////////////////////////////////////////////////////////
router.get('/home_recuire_details', async(req, res)=>{
  try {
    const ownerDetails = await Owner.find({}); // Replace with your database model

    const restaurantDetails = [];

    for (const owner of ownerDetails) {
      if (owner.userType === 'Restaurant Owner') {
        restaurantDetails.push({
          restaurantName: owner.restaurantName,
          deliveryTime: owner.deliveryTime,
          openingTime: owner.openingTime,
          closingTime:owner.closingTime,
          profileImg: owner.profileImg, // Assuming you have a field named 'profileImg' in your database model
        });
      }
    }

    res.json({ restaurantDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
