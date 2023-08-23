const mongoose = require('mongoose');

const DB = process.env.DATABASE;

//mongoose.connect() return promise
mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });