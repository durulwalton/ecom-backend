const authorRepo = require("../repositories/authorRepository");
exports.getAuthors = async () => {
  return authorRepo.getAuthors();
};
exports.saveAuthor = async (fieldsData) => {
  return authorRepo.saveAuthor(fieldsData);
};
