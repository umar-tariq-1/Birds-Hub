const express = require("express");
const { authorize, getAuthorizedUser } = require("../../middlewares/authorize");
const logout = express.Router();

logout.post("/", authorize, (req, res) => {
  return res
    .clearCookie("token", { httpOnly: true, secure: true })
    .status(200)
    .send({ message: "Logged out successfully!", isLoggedIn: false });
});

module.exports = logout;
