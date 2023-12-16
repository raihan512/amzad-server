const express = require("express");
const Writer = require("../models/writer.schema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    Writer.find()
      .then((Writer) => {
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
// Get writer by search writer id
router.get("/:customId", async (req, res) => {
  try {
    const result = await Writer.find({ wirterId: req.params.customId });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
