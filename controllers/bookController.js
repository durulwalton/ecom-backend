const bookService = require("../services/bookService");
const logger = require("../utils/logger");

exports.getBooks = async (req, res, next) => {
  try {
    const articleList = await bookService.getBooks();
    res.status(200).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Fetch all Books Successfully.",
      appData: articleList,
    });
  } catch (error) {
    logger.error("Error in Fetch Books:", error);
    next(error);
  }
};
exports.saveBook = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let book = await bookService.saveBook(formData);
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Book Created Successfully.",
      appData: book,
    });
  } catch (error) {
    logger.error("Error in Save Book:", error);
    next(error);
  }
};
