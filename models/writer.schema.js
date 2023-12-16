const mongoose = require("mongoose");
const writerSchema = new mongoose.Schema({
  wirterId: String,
  name: [""],
  image: String,
  desc: [""],
});

module.exports = mongoose.model("Writer", writerSchema);
