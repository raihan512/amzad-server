const mongoose = require("mongoose");
const CategoriesSchema = new mongoose.Schema({});

module.exports = mongoose.model("Category", CategoriesSchema);
