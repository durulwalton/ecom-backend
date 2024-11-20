const Author = require("../models/authorModel");
exports.getAuthors = async () => {
  return Author.find();
};
exports.getAuthorById = async (id) => {
  return Author.findById(id);
};
exports.saveAuthor = async (authorData) => {
  return Author.create(authorData);
};
