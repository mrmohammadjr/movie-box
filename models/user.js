import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  confirmpassword: {
    type: String,
    required: [true, "Please provide confirmpassword"],
    unique: true,
  },
  favorite: { 
    type: [mongoose.Schema.Types.Mixed],
    default: [] 
  }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
