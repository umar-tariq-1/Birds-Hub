const mongoose = require("mongoose");

async function connectToMongoDBAtlas(conn_URL) {
  try {
    mongoose.connect(conn_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Backend connected to Database`);
  } catch (err) {
    console.log("Error while connecting to Database...\n", err);
  }
}

module.exports = connectToMongoDBAtlas;
