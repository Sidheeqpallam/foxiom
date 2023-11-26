const mongoose = require("mongoose");


const UsersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: false
  },
  userMobileNo: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userOtp: {
    type: String,
  }
});

module.exports = mongoose.model("users", UsersSchema);