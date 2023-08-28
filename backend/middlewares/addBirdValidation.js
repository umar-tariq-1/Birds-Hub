const {
  findKeyWithEmptyStringValue,
  trimObject,
} = require("../utils/objectFunctions");
const { capitalize } = require("../utils/validate");

module.exports.addBirdValidation = (req, res, next) => {
  const file = req.file; // Use req.file instead of req.files for a single image upload
  const jsonData = trimObject(JSON.parse(req.body.data));
  if (jsonData.ringNo === "") {
    delete jsonData.ringNo;
  }
  const { name, price, gender, status, date, purchasedFrom, phone } = jsonData;
  const emptyKey = findKeyWithEmptyStringValue(jsonData);

  if (emptyKey !== null && emptyKey !== "ringNo") {
    return res.status(422).send({
      message: `${capitalize(
        emptyKey.replace(/([A-Z])/g, " $1")
      )} must not be empty`,
    });
  } else if (price && Number(price) < 0) {
    return res.status(422).send({ message: "Price cannot be negative" });
  } else if (
    !(
      name &&
      price >= 0 &&
      gender[0] &&
      status[0] &&
      date &&
      purchasedFrom &&
      phone &&
      file
    )
  ) {
    return res.status(422).send({ message: "Incomplete details entered" });
  } else if (gender[0] !== "M" && gender[0] !== "F") {
    return res.status(422).send({ message: "Incorrect gender entered" });
  } else if (status[0] !== "A" && status[0] !== "D") {
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
