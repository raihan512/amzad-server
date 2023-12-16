const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Book = require("./routes/book.route");
const Publisher = require("./routes/publishers.route");
const Writer = require("./routes/writer.route");
const Editor = require("./routes/editor.route");
const Category = require("./routes/category.route");
const SubCategory = require("./routes/subcategory.route");

const connectDB = require("./utils/connectdb");
app.use("/api/books", Book);
app.use("/api/publisher", Publisher);
app.use("/api/writer", Writer);
app.use("/api/editor", Editor);
app.use("/api/categories", Category);
app.use("/api/subcategory", SubCategory);

connectDB();
const port = 3000;
app.listen(port, () => {
  console.log("Server is running");
});
