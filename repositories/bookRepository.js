const Book = require("../models/bookModel");

exports.getBooks = async () => {
  return Book.find();
};
exports.getBookById = (id) => {
  return Book.findById(id);
};
exports.findByFields = (query) => {
  return Book.findOne(query);
};

exports.saveBook = (bookData) => {
  return Book.create(bookData);
};
