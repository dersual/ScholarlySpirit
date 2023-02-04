// url: mongodb+srv://dersu1317:<password>@scholarlyspirit-cluster.lmzj292.mongodb.net/?retryWrites=true&w=majority
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dersu1317:3gXIdO7G2unjM1Oi@scholarlyspirit-cluster.lmzj292.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("Connected to MongoDB Database!");
  } catch (err) {
    console.error(`Error connecting to MongoDB Database: ${err}`);
    process.exit(1);
  }
};
module.exports = connectToDB;
