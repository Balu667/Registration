const express = require("express");
const User = require("../models/users");
const HttpError = require("../models/http-error");
const fileUpload = require("../middlewares/file-upload");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const router = express.Router();

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid Inputs and does not match our pattern, Please check",
      422
    );
    return next(error)
  }
  const { firstName, lastName, userName, password } = req.body;

  let hasUser;
  try {
    hasUser = await User.findOne({ userName: userName });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signup failed, Please try again", 500));
  }
  if (hasUser) {
    res.status(401).json({ message: "username is already registered, Please Login" })
  }
  const newUser = new User({
    firstName,
    lastName,
    userName,
    password,
    image: req.file ? req.file.path : ""
  });


  try {
    await newUser.save();
    res.status(201).json({ message: "Successfully Register, Please login" })
  } catch (err) {
    console.log(err);
  }
}

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid Inputs and does not match our pattern, Please check",
      422
    );
    return next(error)
  }
  const { userName, password } = req.body;
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
    return next(new HttpError("username is not registered, Plese register first"));
  }
  if (identifyUser.password === password) {
    res.json({ user: identifyUser.toObject({ getters: true }) });
  } else {
    return next(
      new HttpError(
        "password and username mismatch, please enter correct creditials"
      )
    );
  }
}

router.post("/signup", fileUpload.single("image"),
  [check("userName").not().isEmpty(), check("lastName").not().isEmpty(), check("firstName").not().isEmpty(), check("password").isLength({ min: 6 })], signUp);

router.post("/login",
[check("userName").not().isEmpty(), check("password").isLength({ min: 6 })]
, login);

module.exports = router;



