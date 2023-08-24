module.exports.addBirdValidation = (req, res, next) => {
  const file = req.file; // Use req.file instead of req.files for a single image upload
  const jsonData = JSON.parse(req.body.data);
  const { name, price, gender, status, date, purchasedFrom, phone } = jsonData;

  if (
    !(
      name &&
      price &&
      gender &&
      status &&
      date &&
      purchasedFrom &&
      phone &&
      file
    )
  ) {
    return res.status(422).send({ message: "Incomplete details entered" });
  } else if (
    name.trim() === "" ||
    gender.trim() === "" ||
    status.trim() === "" ||
    date.trim() === "" ||
    purchasedFrom.trim() === "" ||
    phone.trim() === ""
  ) {
    return res.status(422).send({ message: "There must be no empty field" });
  } else if (Number(price) < 1) {
    return res.status(422).send({ message: "Price cannot be 0 or negative" });
  } else if (gender !== "M" && gender !== "F") {
    return res.status(422).send({ message: "Incorrect gender entered" });
  } else if (status !== "A" && status !== "D") {
    return res.status(422).send({ message: "Incorrect status entered" });
  } else if (!file) {
    return res.status(400).send({ message: "Please upload 1 image file" });
  } else if (!file.mimetype.startsWith("image/")) {
    return res
      .status(400)
      .send({ message: "Please upload a valid image file" });
  }

  next();
};
