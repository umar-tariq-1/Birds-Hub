const express = require("express");
const mongoose = require("mongoose");
const { authorize, getAuthorizedUser } = require("../middlewares/authorize");
const { addBirdValidation } = require("../middlewares/addBirdValidation");
const multer = require("multer");
const ImageKit = require("imagekit");
const User = require("../models/user");
const bird = require("../models/bird");

const addBird = express.Router();

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// configure the multer
const storage = multer.memoryStorage();

// Create the multer upload object for a single image
const upload = multer({ storage }).single("image");

addBird.post("/", authorize, upload, addBirdValidation, async (req, res) => {
  try {
    const authorizedUser = getAuthorizedUser();
    const user = await User.findById(authorizedUser._id);
    var image;
    var imageKitError;
    const jsonData = JSON.parse(req.body.data);
    const { name, price, gender, status, date, purchasedFrom, phone } =
      jsonData;

    if (req.file) {
      try {
        const response = await imagekit.upload({
          file: req.file.buffer,
          fileName: Math.round(Math.random() * 1e9).toString(),
          folder: "birdImages",
          useUniqueFileName: false,
        });
        image = response.name;
      } catch (error) {
        imageKitError = error;
        res.status(409).send({ message: error.message });
        console.log(error);
      }
    }

    if (
      name &&
      price &&
      gender &&
      status &&
      date &&
      image &&
      purchasedFrom &&
      phone &&
      (status === "A" || status === "D") &&
      (gender === "M" || gender === "F")
    ) {
      // console.log(image);
      const createdBird = new bird({
        name,
        price,
        gender,
        status,
        date,
        purchasedFrom,
        phone,
        image,
        creator: authorizedUser._id,
      });

      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdBird.save({ session: sess });
        user.birds.push(createdBird);
        await user.save({ session: sess });
        await sess.commitTransaction();
        const data = { ...createdBird._doc };
        delete data._id;
        delete data.creator;
        delete data.__v;
        res.status(201).send({ message: "Bird added successfully", data }); //201 indicates successful creation
      } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" }).status(500); //500 indicates server side error
        return;
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = addBird;
