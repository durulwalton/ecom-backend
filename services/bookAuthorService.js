const bookRepo = require("../repositories/bookRepository");
const authorRepo = require("../repositories/authorRepository");
const bookAuthorRepo = require("../repositories/bookAuthorRepository");
const throwError = require("../utils/throwError");

exports.getBookAuthors = () => {
  return bookAuthorRepo.getBookAuthors();
};
exports.getAuthorsByBook = async (book) => {
  const checkBook = await bookRepo.getBookById(book);
  if (!checkBook) {
    throw throwError(`The Book with this id ${book} is not found!`, 404);
  }
  const bookAuthors = await bookAuthorRepo.getAuthorsByBook(book);
  const authors = bookAuthors.map((ab) => ab.author);
  return {
    ...checkBook.toObject(),
    authors,
  };
};
exports.getBooksByAuthor = async (author) => {
  const checkAuthor = await authorRepo.getAuthorById(author);
  if (!checkAuthor) {
    throw throwError(`The Author with this id ${author} is not found!`, 404);
  }
  const authorBooks = await bookAuthorRepo.getBooksByAuthor(author);
  const books = authorBooks.map((ab) => ab.book);
  return {
    ...checkAuthor.toObject(),
    books,
  };
};
exports.saveBookAuthor = async (bookAuthorData) => {
  const checkBook = await bookRepo.getBookById(bookAuthorData.bookId);
  if (!checkBook) {
    throw throwError(
      `The Book with this id ${bookAuthorData.bookId} is not found!`,
      404
    );
  }
  const checkAuthor = await authorRepo.getAuthorById(bookAuthorData.authId);
  if (!checkAuthor) {
    throw throwError(
      `The Author with this id ${bookAuthorData.authId} is not found!`,
      404
    );
  }
  let checkBookAuthor = await bookAuthorRepo.getBookAuthorByFields({
    book: bookAuthorData.bookId,
    author: bookAuthorData.authId,
  });
  if (checkBookAuthor) {
    throw throwError(`The Author with this Book already assigned!`, 404);
  }
  return bookAuthorRepo.saveBookAuthor({
    book: bookAuthorData.bookId,
    author: bookAuthorData.authId,
  });
};
