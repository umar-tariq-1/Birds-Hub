const {
  findKeyWithEmptyStringValue,
  trimObject,
} = require("../utils/objectFunctions");
const { capitalize } = require("../utils/validate");

module.exports.addBirdValidation = (req, res, next) => {
  const file = req.file; // Use req.file instead of req.files for a single image upload
  const jsonData = trimObject(JSON.parse(req.body.data));
  const { name, price, gender, status, ringNo, date, purchasedFrom, phone } =
    jsonData;
  const emptyKey = findKeyWithEmptyStringValue(jsonData);

  if (emptyKey !== null) {
    return res.status(422).send({
      message: `${capitalize(
        emptyKey.replace(/([A-Z])/g, " $1")
      )} must not be empty`,
    });
  } else if (
    !(
      name &&
      price &&
      gender &&
      status &&
      ringNo &&
      date &&
      purchasedFrom &&
      phone &&
      file
    )
  ) {
    return res.status(422).send({ message: "Incomplete details entered" });
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
