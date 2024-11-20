const BookAuthor = require("../models/bookAuthorModel");

exports.getBookAuthors = async () => {
  return BookAuthor.find().populate("book").populate("author");
};
exports.getAuthorsByBook = (book) => {
  return BookAuthor.find({ book }).populate("author");
};
exports.getBooksByAuthor = (author) => {
  return BookAuthor.find({ author }).populate("book");
};
exports.getBookAuthorByFields = async (query) => {
  return BookAuthor.findOne(query);
};
exports.saveBookAuthor = async (bookAuthorData) => {
  return BookAuthor.create(bookAuthorData);
};
