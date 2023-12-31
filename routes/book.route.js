const express = require("express");
const router = express.Router();
const Book = require("../models/book.schema");
const { json } = require("body-parser");

// Get all books from mongodb
router.get("/", async (req, res) => {
  try {
    Book.find()
      .then((Book) => {
        res.status(200).json(Book);
      })
      .catch((error) => {
        res.status(500).json({ msg: "Failed to fetch Books" });
      });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch Books from Database" });
  }
});
// Get book by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Book.findById(id)
      .then((Book) => {
        res.status(200).json(Book);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to get Book. Check Id" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to get Book" });
  }
});
// Add Book to mongoDB
router.post("/book", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook
      .save()
      .then((savedBook) => {
        console.log(savedBook);
        res.status(200).json({ msg: "Book successfully saved" });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 11000 && error.keyPattern.email) {
          res.status(500).json({ msg: "Email already exists" });
        } else {
          res.status(500).json({ msg: "Unable to save contact" });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to save" });
  }
});
// Get books by writer
router.post("/writerbooks", async (req, res) => {
  try {
    const keys = req.body;
    const book = await Book.find({
      writer: { $in: keys },
    });
    res.status(200).json(book);
  } catch (error) {
    console.error("Error loading writers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Load books by Category
router.post("/category", async (req, res) => {
  try {
    const query = req.body;
    const book = await Book.find({
      category: { $in: query },
    });
    res.status(200).json(book);
  } catch (error) {
    console.error("Error loading writers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Load books by subCategory
router.post("/subcategory", async (req, res) => {
  try {
    const query = req.body;
    const book = await Book.find({
      subCategory: { $in: query },
    });
    res.status(200).json(book);
  } catch (error) {
    console.error("Error loading writers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
