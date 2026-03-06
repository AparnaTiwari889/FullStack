
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req,res)=>{
  try{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
      return res.status(400).json({message:"All fields required"});
    }

    const existing = await User.findOne({email});
    if(existing){
      return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({message:"User registered successfully"});

  }catch(err){
    res.status(500).json({message:"Server Error"});
  }
});

module.exports = router;
