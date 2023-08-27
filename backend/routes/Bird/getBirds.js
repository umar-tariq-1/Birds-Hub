const express = require("express");
const mongoose = require("mongoose");
const { authorize, getAuthorizedUser } = require("../../middlewares/authorize");
const User = require("../../models/user");
const bird = require("../../models/bird");
const { reorderKeys } = require("../../utils/objectFunctions");

const getBirds = express.Router();

getBirds.get("/", authorize, async (req, res) => {
  try {
    const authorizedUser = getAuthorizedUser();
    const birds = await bird.find(
      { creator: authorizedUser._id },
      { __v: 0, creator: 0 }
    );
    const data = [...birds];
    if (data.length > 0) {
      const order = [
        "_id",
        "image",
        "name",
        "price",
        "gender",
        "status",
        "ringNo",
        "date",
        "purchasedFrom",
        "phone",
      ];
      const orderedData = data.map((item) => reorderKeys(item, order));

      return res
        .status(200)
        .send({ message: "All birds fetched successfully", orderedData });
    } else {
      return res.status(200).send({ message: "Sorry, No birds found" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = getBirds;
