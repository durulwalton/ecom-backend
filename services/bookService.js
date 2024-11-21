const bookRepo = require("../repositories/bookRepository");
const throwError = require("../utils/throwError");

exports.getBooks = async () => {
  return bookRepo.getBooks();
};
exports.saveBook = async (bookData) => {
  const checkBook = await bookRepo.findByFields({
    title: bookData.title,
  });
  if (checkBook) {
    throw throwError(`This ${bookData.title} already exists!`, 400);
  }
  return bookRepo.saveBook(bookData);
};
