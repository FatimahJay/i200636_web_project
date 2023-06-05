const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
	email: { 
    type: String, 
    required: true 
    },
	password: {  
    type: String, 
    required: true
    },
  role: {  
    type: String, 
    required: true,
    enum: ['admin', 'seller', 'customer'],
    default: 'customer'
    },  
});

const UserSchema = mongoose.model("User_Schema", userSchema);

module.exports = UserSchema;
