const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ownerSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true }, // Store the confirm password in plain text
  location: { type: String, required: true },
  deliveryTime:{ type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  profileImg: {type: String, required: true},
  userType: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }], // Store tokens as an array of objects
});

// Password hashing before saving
ownerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Token generation method
ownerSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY); // Replace 'your_secret_key' with a strong random string
    this.tokens = this.tokens.concat({ token:token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Owner = mongoose.model('OWNER', ownerSchema);

module.exports = Owner;
