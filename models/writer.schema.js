const mongoose = require("mongoose");
const writerSchema = new mongoose.Schema({
  writerName: {
    type: [String],
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        const existingWriter = await mongoose
          .model("Write", writerSchema)
          .findOne({ title: value });
        return !existingWriter;
      },
      message: "Title must be unique.",
    },
  },
  writerImage: {
    type: String,
    default: "https://i.ibb.co/1v2V4H9/account-icon-138984.png",
  },
  writerDesc: {
    type: [String],
    required: true,
  },
});

writerSchema.index(
  { writerName: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("Writer", writerSchema);
