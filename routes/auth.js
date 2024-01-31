import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Register User
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //new user creation
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(`${error} + Interal error!`);
  }
  /* This bunch of code is to check whether your Model is able to save data, you can check your collection to confirm after 
    running this code 
      router.get("/register", async (req, res) => { ---- note this change that it will be a get methos in the beginning
    const user = await new User({
     username: "Hemanth",
     email: "123@gmail.com",
     password: "112233",
   });
   await user.save();
res.send("ok");*/
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong Password");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(`${error} + Interal error!`);
  }
});

export default router;
