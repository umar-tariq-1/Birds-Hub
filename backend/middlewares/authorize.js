const jwt = require("jsonwebtoken");
const User = require("../models/user");

var authorizedUser;

module.exports.authorize = async (req, res, next) => {
  try {
    var token = req.cookies.token;
    if (!token) {
      return res.status(401).send({
        message: "Sorry, you are not logged in for this",
        isLoggedIn: false,
      });
    }
  } catch (err) {
    return res.status(401).send({
      message: "Sorry, didn't get cookie in request",
      isLoggedIn: false,
    });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.clearCookie("token", { httpOnly: true }).status(401).send({
        message: "Access token expired. Please login again!",
        isLoggedIn: false,
      });
    } else {
      const user = await User.findById(data.id);

      if (user) {
        authorizedUser = { ...user._doc };

        next();
      } else {
        return res.status(401).send({
          message: "Sorry, you are not authorized for this",
          isLoggedIn: false,
        });
      }
    }
  });
};

module.exports.getAuthorizedUser = () => {
  return authorizedUser;
};
