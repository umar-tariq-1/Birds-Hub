const express = require("express");
const mongoose = require("mongoose");
const { authorize, getAuthorizedUser } = require("../../middlewares/authorize");
const User = require("../../models/user");
const bird = require("../../models/bird");
const {
  convertAbbreviations,
  sortByName,
} = require("../../utils/objectFunctions");

const getBirds = express.Router();

getBirds.get("/", authorize, async (req, res) => {
  try {
    const authorizedUser = getAuthorizedUser();
    const birds = await bird.find(
      { creator: authorizedUser._id },
      { __v: 0, creator: 0 }
    );
    var birdsData = birds.map((item) => item?._doc);
    if (birdsData.length > 0) {
      birdsData = sortByName(birdsData);
      const orderedData = convertAbbreviations(birdsData);

      return res
        .status(200)
        .send({ message: "All birds fetched successfully", orderedData });
    } else {
      return res.status(200).send({ message: "Sorry, No birds found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = getBirds;
