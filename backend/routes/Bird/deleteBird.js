const express = require("express");
const mongoose = require("mongoose");
const ImageKit = require("imagekit");
const { authorize, getAuthorizedUser } = require("../../middlewares/authorize");
const Bird = require("../../models/bird");
const User = require("../../models/user");

const deleteBird = express.Router();

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

deleteBird.delete("/:id", authorize, async (req, res) => {
  const birdId = req.params.id;
  const authorizedUser = getAuthorizedUser();
  try {
    var birdData = await Bird.findById(birdId);

    if (!birdData) {
      return res.status(404).send({ message: "Bird not found" });
    }

    if (!birdData.creator.equals(authorizedUser._id)) {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete this bird" });
    }

    var sess = await mongoose.startSession();
    sess.startTransaction();

    await User.findByIdAndUpdate(
      authorizedUser._id,
      {
        $pull: { birds: birdId },
      },
      { session: sess }
    );
    await Bird.findByIdAndRemove(birdId, { session: sess });

    const isImageUploaded =
      birdData.image.name !== "" && birdData.image.id !== "";

    if (isImageUploaded) {
      try {
        await imagekit.deleteFile(birdData.image.id);
      } catch (error) {
        await sess.abortTransaction();
        await sess.endSession();
        console.log(error?.message);
        return res.status(500).send({ message: error?.message });
      }
    }
    await sess.commitTransaction();
    await sess.endSession();

    res.status(200).send({ message: "Bird deleted successfully" });
  } catch (error) {
    await sess.abortTransaction();
    await sess.endSession();
    return res.status(500).send({ message: "Error deleting bird" });
  }
});

module.exports = deleteBird;
