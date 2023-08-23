const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    }, 
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    cpassword:{
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    userType:{
        type: String,
        required: true
    },
    tokens: [{ token: { type: String, required: true } }], // Store tokens as an array of objects

})



////we are hashing 
userSchema.pre('save',async function(next){
    console.log("hye from userSchema password encrypting")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;