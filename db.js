const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.mongoURL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to mongodb server");
});

db.on("error", (err) => {
  console.log("mongodb connected  error", err);
});

db.on("disconnected", () => {
  console.log("mongodb disconnected");
});

module.exports = db;
