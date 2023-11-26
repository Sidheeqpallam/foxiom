const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true
  },
  bookAuthor: {
    type: String,
    required: true
  },
  bookDescription: {
    type: String,
    required: false
  },
  bookPublishedYear: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("books", BookSchema);