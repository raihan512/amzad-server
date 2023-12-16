const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Contact = require("./routes/contact");
const Book = require("./routes/book.route");
const Publisher = require("./routes/publishers.route");
const Writer = require("./routes/writer.route");

const connectDB = require("./utils/connectdb");
app.use("/api", Contact);
app.use("/api/books", Book);
app.use("/api/publisher", Publisher);
app.use("/api/writer", Writer);

connectDB();
const port = 3000;
app.listen(port, () => {
  console.log("Server is running");
});
