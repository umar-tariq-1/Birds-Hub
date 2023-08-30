const express = require("express");
const mongoose = require("mongoose");
const { authorize, getAuthorizedUser } = require("../../middlewares/authorize");
const { addBirdValidation } = require("../../middlewares/addBirdValidation");
const multer = require("multer");
const ImageKit = require("imagekit");
const User = require("../../models/user");
const Bird = require("../../models/bird");
const { trimObject, reorderKeys } = require("../../utils/objectFunctions");

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
  const authorizedUser = getAuthorizedUser();

  var image;
  const jsonData = trimObject(JSON.parse(req.body.data));
  const {
    name,
    price,
    gender,
    status,
    dna,
    ringNo,
    date,
    purchasedFrom,
    phone,
  } = jsonData;

  const sess = await mongoose.startSession();
  sess.startTransaction();

  try {
    try {
      const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: Math.round(Math.random() * 1e9).toString(),
        folder: "birdImages",
        useUniqueFileName: false,
      });
      image = { name: response.name, id: response.fileId };
    } catch (error) {
      await sess.abortTransaction();
      await sess.endSession();
      console.log(error?.message);
      return res.status(409).send({ message: error?.message });
    }

    const createdBird = new Bird({
      name,
      price,
      gender: gender[0],
      status: status[0],
      dna,
      date,
      ringNo: ringNo ? ringNo : "",
      purchasedFrom,
      phone,
      image,
      creator: authorizedUser._id,
    });

    await createdBird.save({ session: sess });
    await User.findByIdAndUpdate(
      authorizedUser._id,
      {
        $push: { birds: createdBird },
      },
      { session: sess }
    );

    const data = { ...createdBird._doc };
    delete data.creator;
    delete data.__v;
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
    const orderedData = reorderKeys(data, order);
    await sess.commitTransaction();
    await sess.endSession();
    res.status(201).send({ message: "Bird added successfully", orderedData }); //201 indicates successful creation
  } catch (error) {
    try {
      await imagekit.deleteFile(image.id);
    } catch (error) {
      console.log(error?.message);
    }
    await sess.abortTransaction();
    await sess.endSession();
    console.log(error?.message);
    res.send({ message: "Internal server error" }).status(500); //500 indicates server side error
    return;
  }
});

module.exports = addBird;
