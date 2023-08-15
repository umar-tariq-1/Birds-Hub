const express = require("express");
const cors = require("cors");
const connectToMongoDBAtlas = require("./utils/DBconnection");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");
const addProduct = require("./routes/addProduct");
const getProducts = require("./routes/getProducts");

const app = express();

// app.use("*", cors({ origin: true, credentials: true }));
app.use(
  "*",
  cors({
    origin: process.env.ORIGIN || true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/addProduct", addProduct);
app.use("/getProducts", getProducts);

const PORT = process.env.PORT || 3001;
const CONN_URL = process.env.DB_CONN_URL;

(async () => {
  await connectToMongoDBAtlas(CONN_URL);
  app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}...`);
  });
})();
