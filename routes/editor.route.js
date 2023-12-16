const express = require("express");
const Editor = require("../models/editor.schema");
const router = express.Router();

// Get all editors
router.get("/", async (req, res) => {
  try {
    Editor.find()
      .then((Editor) => {
        res.status(200).json(Editor);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Failed to fetch Editors" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to fetch Editors from Database" });
  }
});

// Get category by categoryId
router.get("/:id", async (req, res) => {
  try {
    const editor = await Editor.find({ editorId: req.params.id });
    res.json(editor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
