const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

let scheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  umur: {
    type: Number,
    required: true,
  },
});

const userDb = mongoose.model("userdb", scheme);

module.exports = userDb;
