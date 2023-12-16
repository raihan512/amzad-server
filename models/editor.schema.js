const mongoose = require("mongoose");

const EditorSchema = new mongoose.Schema({});

module.exports = mongoose.model("Editor", EditorSchema);
