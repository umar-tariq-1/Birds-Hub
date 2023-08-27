const express = require("express");
const mongoose = require("mongoose");
const { authorize, getAuthorizedUser } = require("../../middlewares/authorize");
const { capitalize } = require("../../utils/validate");
const {
  trimObject,
  isEmptyNullOrUndefined,
  findKeyWithEmptyStringValue,
  reorderKeys,
} = require("../../utils/objectFunctions");
const multer = require("multer");
const ImageKit = require("imagekit");
const User = require("../../models/user");
const Bird = require("../../models/bird");

const updateBird = express.Router();

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// configure the multer
const storage = multer.memoryStorage();

// Create the multer upload object for a single image
const upload = multer({ storage }).single("image");

updateBird.put("/:id", authorize, upload, async (req, res) => {
  const birdId = req.params.id;
  const authorizedUser = getAuthorizedUser();
  var image;
  var updatedData;

  const jsonData = JSON.parse(req?.body?.data);
  updatedData = trimObject(jsonData);
  const emptyKey = findKeyWithEmptyStringValue(updatedData);

  const price = updatedData.price ? updatedData.price : 9999;
  const gender = updatedData.gender ? updatedData.gender : "M";
  const status = updatedData.status ? updatedData.status : "A";

  if (emptyKey !== null && emptyKey !== "ringNo") {
    return res.status(400).send({
      message: `${capitalize(
        emptyKey.replace(/([A-Z])/g, " $1")
      )} must not be empty`,
    });
  } else if (Number(price) < 0) {
    return res.status(422).send({ message: "Price cannot be negative" });
  } else if (gender !== "M" && gender !== "F") {
    return res.status(422).send({ message: "Incorrect gender entered" });
  } else if (status !== "A" && status !== "D") {
    return res.status(422).send({ message: "Incorrect status entered" });
  }

  try {
    const birdData = await Bird.findById(birdId);
    if (!birdData) {
      return res.status(404).send({ message: "Bird not found" });
    }

    if (!birdData.creator.equals(authorizedUser._id)) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this bird" });
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();

    if (req.file) {
      try {
        try {
          await imagekit.deleteFile(birdData.image.id);
        } catch (error) {
          await sess.abortTransaction();
          await sess.endSession();
          console.log(error?.message);
          return res.status(500).send({ message: error?.message });
        }
        const response = await imagekit.upload({
          file: req.file.buffer,
          fileName: birdData.image.name,
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
    }
    if (!isEmptyNullOrUndefined(updatedData)) {
      updatedData = { ...updatedData, image };
    } else {
      updatedData = { image };
    }
    try {
      const updatedBird = await Bird.findByIdAndUpdate(birdId, updatedData, {
        new: true,
        session: sess,
      });

      await sess.commitTransaction();
      await sess.endSession();

      const data = { ...updatedBird._doc };
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
      return res
        .status(200)
        .send({ message: "Bird updated successfully", orderedData });
    } catch (error) {
      await sess.abortTransaction();
      await sess.endSession();
      return res.status(500).send({ message: "Error updating bird" });
    }
  } catch (error) {}
});

module.exports = updateBird;
