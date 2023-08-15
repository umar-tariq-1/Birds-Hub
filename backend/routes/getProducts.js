const express = require("express");
const mongoose = require("mongoose");
const { authorize } = require("../middlewares/authorize");
const User = require("../models/user");
const product = require("../models/product");

const getProducts = express.Router();

getProducts.get("/", authorize, async (req, res) => {
  try {
    const products = await product.find({}, { _id: 0, __v: 0 });
    data = [...products];
    if (data.length > 0) {
      return res
        .status(200)
        .send({ message: "All products fetched successfully", data });
    } else {
      return res.status(200).send({ message: "Sorry, No products found" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = getProducts;
