const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    profession: String,
    phoneNumber: String,
    address: String,
    password: String,
    confirmPassword: String,
    otp: String,
  },
  {
    collection: "reactapp",
  }
);

mongoose.model("reactapp", UserDetailsScehma);