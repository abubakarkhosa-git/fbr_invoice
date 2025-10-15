import mongoose from "mongoose";

// Step 1: Create Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,        
    required: true     
  },
email: {
    type: String,
    required: true,
    unique: true },

password:{
        type: String,
        required: true,

    }
  })        

const User = mongoose.model("User", userSchema);

// Step 3: Export Model
export default User;


