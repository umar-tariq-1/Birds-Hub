const express = require("express");
const { authorize, getAuthorizedUser } = require("../middlewares/authorize");
const logout = express.Router();

logout.post("/", authorize, (req, res) => {
  return res
    .clearCookie("token", { httpOnly: true })
    .send({ message: "Logged out successfully!", isLoggedIn: false })
    .status(200);
});

module.exports = logout;
