module.exports.addProductValidation = (req, res, next) => {
  const files = req.files;
  const jsonData = JSON.parse(req.body.data);
  const { name, description, quantity, price, address } = jsonData;
  const validImages = files.every((file) => file.mimetype.startsWith("image/"));

  if (!(name && description && quantity && price && address && files)) {
    return res.send({ message: "Incomplete details entered" }).status(422);
  } else if (
    name.trim() === "" ||
    description.trim() === "" ||
    quantity.trim() === "" ||
    address.trim() === ""
  ) {
    return res.status(422).send({ message: "There must be no empty field" });
  } else if (Number(price) < 1) {
    return res.status(422).send({ message: "Price cannot be 0 or negative" });
  } else if (quantity !== "Bulk" && quantity !== "Few") {
    return res.status(422).send({ message: "Incorrect quantity entered" });
  } else if (!files || files.length === 0) {
    return res
      .status(400)
      .send({ message: "Please upload atleast one image file" });
  } else if (files.length > 4) {
    return res
      .status(400)
      .send({ message: "Please upload atmost four image files" });
  } else if (!validImages) {
    return res
      .status(400)
      .send({ message: "Please upload valid image file/s" });
  }

  next();
};
