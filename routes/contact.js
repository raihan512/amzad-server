const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// Add contact to mongoDB
router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact
      .save()
      .then((savedContact) => {
        console.log(savedContact);
        res.status(200).json({ msg: "Contact successfully saved" });
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

module.exports = router;
