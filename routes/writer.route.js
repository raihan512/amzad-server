const express = require("express");
const Writer = require("../models/writer.schema");
const { json } = require("body-parser");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    Writer.find()
      .then((Writer) => {
        console.log(Writer);
        res.status(200).json({ Writer: Writer });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Failed to fetch Writers" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to fetch writers from Database" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Writer.findById(id)
      .then((writer) => {
        console.log(writer);
        res.status(200).json({ writer: writer });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Writer not found" });
      });
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const newWriter = new Writer(req.body);
    await newWriter
      .save()
      .then((newWriter) => {
        console.log(newWriter);
        res.status(200).json({ msg: "Writer added successfully" });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 11000 && error.keyPattern.writerName) {
          res.status(500).json({ msg: "Writer already exist" });
        }
        res.status(500).json({ msg: "Writer failed to add" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to add Writer" });
  }
});
module.exports = router;
