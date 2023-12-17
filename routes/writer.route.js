const express = require("express");
const Writer = require("../models/writer.schema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    Writer.find()
      .then((Writer) => {
        res.status(200).json(Writer);
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
// Get writer by search writer id
router.get("/:id", async (req, res) => {
  try {
    const writer = await Writer.find({ writerId: req.params.id });
    res.status(200).json(writer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/getwriters", async (req, res) => {
  try {
    const keys = req.body.flat();
    const writers = await Writer.find({ writerId: { $in: keys } });
    res.status(200).json(writers);
  } catch (error) {
    console.error("Error loading writers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
