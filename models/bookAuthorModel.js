const mongoose = require("mongoose");
const bookAuthorSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  author: {type: mongoose.Schema.Types.ObjectId,ref: "Author",required: true},
});
const BookAuthor = mongoose.model("BookAuthor", bookAuthorSchema);
module.exports = BookAuthor;
