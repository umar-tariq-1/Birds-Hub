const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { createToken } = require("../utils/token");

const login = express.Router();

function validate(Phone, Password) {
  /* if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
    return "Invalid Email";
  } */
  if (!Phone.match(/^\+?\d{8,15}$/)) {
    return "Invalid Phone Number";
  } else if (!Password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
    return "Incorrect Password";
  } else {
    return undefined;
  }
}

login.post("/", async (req, res) => {
  try {
    if (req.body.phone && req.body.password) {
      loginData = {
        phone: req.body.phone.toLowerCase().trim(),
        password: req.body.password,
      };
    } else {
      res
        .status(403)
        .send({ message: "Incomplete info entered", isLoggedIn: false }); //403 indicates validation error
      return;
    }

    const Error = validate(loginData.phone, loginData.password);
    if (Error) {
      res.status(403).send({ message: Error, isLoggedIn: false }); //403 indicates validation error
      return;
    }

    const foundUser = await User.findOne(
      { phone: loginData.phone },
      { __v: 0, products: 0 }
    );

    if (!foundUser) {
      return res.status(401).send({ message: "Incorrect Phone Number" });
    }

    const validPassword = await bcrypt.compare(
      loginData.password,
      foundUser.password
    );

    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "Incorrect Password", isLoggedIn: false });
    }

    var loggedInUser = { ...foundUser._doc };
    delete loggedInUser.password;
    delete loggedInUser._id;
    var tokenExpirationTime = Date.now() + 1000 * 60 * 60 * 24;
    const token = createToken(foundUser._id, "24h");
    //console.log(token);
    res.cookie("token", token, {
      withCredentials: true,
      secure: true,
      httpOnly: true,
      maxAge: 50 * 365 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
      message: "LoggedIn successfully!",
      loggedInUser,
      isLoggedIn: true,
      tokenExpirationTime,
    });
    //console.log(token);
  } catch (err) {
    console.log(err);
  }
});

module.exports = login;
