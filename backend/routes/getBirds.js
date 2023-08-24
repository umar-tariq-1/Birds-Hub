const express = require("express");
const mongoose = require("mongoose");
const { authorize, getAuthorizedUser } = require("../middlewares/authorize");
const User = require("../models/user");
const bird = require("../models/bird");

const getBirds = express.Router();

getBirds.get("/", authorize, async (req, res) => {
  try {
    const authorizedUser = getAuthorizedUser();
    const birds = await bird.find(
      { creator: authorizedUser._id },
      { _id: 0, __v: 0, creator: 0 }
    );
    data = [...birds];
    if (data.length > 0) {
      return res
        .status(200)
        .send({ message: "All birds fetched successfully", data });
    } else {
      return res.status(200).send({ message: "Sorry, No birds found" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = getBirds;
