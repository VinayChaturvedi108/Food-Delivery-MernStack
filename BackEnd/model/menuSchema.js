// backend/models/menuSchema.js
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  data: [
      {
          imageLink: String,
          itemPrice: Number,
          itemName: String
      }
  ]
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Owner',
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // itemImage: {
  //   type: String,
  //   required: true,
  // },
  // itemName: {
  //   type: String,
  //   required: true,
  // },
  // itemPrice: {
  //   type: Number,
  //   required: true,
  // },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;

