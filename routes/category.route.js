const express = require("express");
const Category = require("../models/category.schema");
const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    Category.find()
      .then((Category) => {
        res.status(200).json(Category);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Failed to fetch Categories" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to fetch Categories from Database" });
  }
});

// Get category by categoryId
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.find({ categoryId: req.params.id });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
