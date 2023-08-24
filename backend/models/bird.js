const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const birdSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  gender: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true },
  purchasedFrom: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Bird", birdSchema);
