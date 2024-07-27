const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number, // Age in years
  },
  height: {
    type: Number, // Height in centimeters
  },
  weight: {
    type: Number, // Weight in kilograms
  },
});

module.exports = mongoose.model("User", UserSchema);
