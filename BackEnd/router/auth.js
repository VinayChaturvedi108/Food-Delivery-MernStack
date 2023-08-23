const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

require('../Server/conn');
const ser = require('../Server/get');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
  res.send('Hello world from the server router js');
});

// Register route
router.post('/register', async (req, res) => {
  const { name, email, phone, password, cpassword, location, userType } = req.body;

  if (!name || !email || !phone || !password || !cpassword || !location || !userType) {
    return res.status(422).json({ error: 'Please fill the information properly' });
  }

  try {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(422).json({ error: 'Email is already Exist' });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: 'Password is not matching' });
    } else {
      const user = new User({ name, email, phone, password, cpassword, location, userType });
      const userSignup = await user.save();

      if (userSignup) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ message: 'User registered successfully', token });
      } else {
        res.status(500).json({ error: 'Registration Failed' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route

router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const isMatchToo = await bcrypt.compare(userType, user.userType);

    if (!isMatch && !isMatchToo) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token with the user ID as payload and send it back to the client
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json({ error: 'Access denied' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.userId = decodedToken._id;
    next();
  });
};

router.post('/logout', (req, res) => {
  res.clearCookie('jwt'); // Clear the JWT cookie to log out the user
  res.json({ message: 'Logout successful' });
});

// Profile route to fetch user details based on the JWT token
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Fetch the user from the 'User' collection
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profileData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      location: user.location,
      userType: user.userType,
    };

    res.json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/updatePassword', async (req, res) => {
  const { email, name, userType, newPassword } = req.body;

  try {
    // Find the user by matching email, name, and userType
    const user = await User.findOne({ email, name, userType });

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



module.exports = router;
