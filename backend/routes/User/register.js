const express = require("express");
const { validate } = require("../../utils/validate");
const { capitalize } = require("../../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { findKeyWithEmptyStringValue } = require("../../utils/objectFunctions");
const { createToken } = require("../../utils/token");

const register = express.Router();

register.post("/", async (req, res) => {
  var userData = {
    firstName: capitalize(req.body?.firstName.trim()),
    lastName: capitalize(req.body?.lastName.trim()),
    phone: req.body?.phone.trim(),
    password: req.body?.password,
    confirmPassword: req.body?.confirmPassword,
  };

  const emptyKey = findKeyWithEmptyStringValue(userData);

  if (emptyKey !== null) {
    return res.status(422).send({
      message: `${capitalize(
        emptyKey.replace(/([A-Z])/g, " $1")
      )} must not be empty`,
    });
  } else if (
    userData.firstName &&
    userData.lastName &&
    userData.phone &&
    userData.password &&
    userData.confirmPassword
  ) {
  } else {
    res.status(403).send({ message: "Incomplete info entered" }); //403 indicates validation error
    return;
  }

  const Error = validate(
    userData.firstName,
    userData.lastName,
    userData.phone,
    userData.password,
    userData.confirmPassword
  );

  if (Error) {
    res.status(403).send({ message: Error }); //403 indicates validation error
    return;
  }

  const userExists = await User.findOne({ phone: userData.phone });

  if (userExists) {
    res.status(409).send({ message: "User already exists" });
    return;
    //409 indicates conflict in the request, in our case user already exists
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  userData = { ...userData, password: hashedPassword };

  const createdUser = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
    password: userData.password,
    birds: [],
  });

  try {
    await createdUser.save();
    const token = createToken(createdUser._id, "50h");

    const loggedInUser = { ...createdUser._doc };
    delete loggedInUser?.password;
    delete loggedInUser?.__v;
    delete loggedInUser?._id;
    var tokenExpirationTime = Date.now() + 1000 * 60 * 60 * 50;
    //console.log(token);
    res.cookie("token", token, {
      withCredentials: true,
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: 50 * 365 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send({
      message: "User registered and loggedIn successfully",
      isLoggedIn: true,
      tokenExpirationTime,
      loggedInUser,
    }); //201 indicates successful creation
  } catch (error) {
    res.send({ message: "internal server error" }).status(500); //500 indicates server side error
    return;
  }
});

module.exports = register;
