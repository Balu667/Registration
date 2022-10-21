const express = require("express");
const User = require("../models/users");
const HttpError = require("../models/http-error");
const fileUpload = require("../middlewares/file-upload");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const router = express.Router();

const signUp = async (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new HttpError(
      "Invalid Inputs and does not match our pattern, Please check",
      422
    );
  }
    const {firstName, lastName, userName, password} = req.body;
    
    let hasUser;
    try {
     hasUser = await User.findOne({ userName: userName });
   } catch (err) {
     console.log(err);
     return next(new HttpError("Signup failed, Please try again", 500));
   }
   if (hasUser) {
    res.status(401).json({message:"username is already registered, Please Login"})
   }
    const newUser = new User({
       firstName,
       lastName,
       userName,
       password,
       image: req.file ?  req.file.path : ""
    });
   
   
    try{
       await newUser.save();
    }catch(err) {
       console.log(err);
    }

    res.status(201).json({message:"Successfully Register, Please login"})
   }



const login = async (req,res,next) => {
    const {userName, password} = req.body;
    let identifyUser;
    try {
      identifyUser = await User.findOne({ userName: userName });
    } catch (err) {
      console.log(err);
      return next(
        new HttpError("login failed, something went wrong Please check")
      );
    }
  
    if (!identifyUser) {
      return next(new HttpError("Email is not registered, Plese register first"));
    }
    if (identifyUser.password === password) {
      res.json({ user: identifyUser.toObject({ getters: true }) });
    } else {
      return next(
        new HttpError(
          "password and email mismatch, please enter correct creditials"
        )
      );
    }
  }


  router.post("/signup",fileUpload.single("image"),
  [check("password").isLength({ min: 6 })],signUp);

  router.post("/login",login);

  module.exports = router;
   


