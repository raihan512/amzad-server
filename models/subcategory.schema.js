const mongoose = require("mongoose");
const SubCategorySchema = new mongoose.Schema({});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
