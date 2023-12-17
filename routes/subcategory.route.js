const express = require("express");
const SubCategory = require("../models/subcategory.schema");
const router = express.Router();

// Get all sub categories
router.get("/", async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.json(subCategories);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Failed to fetch SubCategories from Database" });
  }
});

// Get sub category by id
router.get("/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.find({
      subCategoryId: req.params.id,
    });
    res.json(subCategory);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
// Get selected sub category
router.post("/selectedsubcategory", async (req, res) => {
  try {
    const keys = req.body;
    const subCategory = await SubCategory.find({
      subCategoryId: { $in: keys },
    });
    res.status(200).json(subCategory);
  } catch (error) {
    console.error("Error loading writers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
