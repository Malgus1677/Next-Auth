import mongoose from "mongoose";


const userShema = new mongoose.Schema({
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
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  updatedAt : {
    type : Date,
    default : Date.now
  },
  provider : {
    type : String,
    default : 'credentials'
  },
}, {timestamps : true});

const User = mongoose.models.User || mongoose.model("User", userShema);

export default User;
