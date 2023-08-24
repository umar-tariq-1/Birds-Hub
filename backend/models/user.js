const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birds: [{ type: mongoose.Types.ObjectId, required: true, ref: "Bird" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
