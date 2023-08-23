// const express = require('express');
// const router = express.Router();
// const Customer = require('../models/customer');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Middleware to verify the JWT token
// const verifyToken = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (!token) {
//         return res.status(403).json({ error: 'Access denied' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
//         if (err) {
//             return res.status(403).json({ error: 'Invalid token' });
//         }

//         req.userId = decodedToken._id;
//         next();
//     });
// };

// // Fetch customer details based on the email and password provided during login/signup
// router.get('/profile', verifyToken, async (req, res) => {
//     try {
//         // Fetch the customer from the 'Customer' collection
//         const customer = await Customer.findById(req.userId);
//         if (!customer) {
//             return res.status(404).json({ error: 'Customer not found' });
//         }

//         // If the user is a customer, fetch their details from the 'User' collection
//         const user = await User.findById(customer._id);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const profileData = {
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             location: user.location
//         };

//         res.json(profileData);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;
