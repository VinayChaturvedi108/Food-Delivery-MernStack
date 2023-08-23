////File no. 1 create a express server
////File no. 2 Add it with database like MongoDB
////File no. 3 Design a user schema (means set the datatypes of information input by user) 
////File no. 4 For authentication & stored user Schema on mongodb
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config({ path: './config.env' });////Here we give a path of the .env file for get the values of DB & PORT from conf 
require('./Server/conn') ////In this file we use the fatched value of DB & PORT after that we Import this file here

// const User = require('./model/userSchema')
app.use(cookieParser());
app.use(express.json());
app.use(require('./router/auth'));
app.use(require('./router/restaurant'))

const PORT = process.env.PORT ;


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

const middleware = (req, res, next) =>{
    console.log('Hello my middleware');
    next();
}
app.get('/', (req, res) => {

  res.send('Hii this is Home');
});

app.get('/About', middleware, (req,  res) => {
  res.send('Hii this is About');
});

app.get('/login', (req, res) => {
  // res.cookie("Test", 'thapa')
  res.send('Hii this is Login');
});

app.get('/Signup', (req, res) => {
  res.send('Hii this is Registration');
});

