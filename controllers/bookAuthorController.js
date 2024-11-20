const bookAuthorService = require("../services/bookAuthorService");
const logger = require("../utils/logger");

exports.getBookAuthors = async (req, res, next) => {
  try {
    const bookauthorList = await bookAuthorService.getBookAuthors();
    // const bookauthorList = await bookAuthorService.getBooksByAuthor("673b25aa7a7d41d4cf86fa11");
    // const bookauthorList = await bookAuthorService.getAuthorsByBook("673c4d700bc44b6530cd2467");
    res.status(200).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Fetch all Successfully.",
      appData: bookauthorList,
    });
  } catch (error) {
    logger.error("Error in Fetch Books:", error);
    next(error);
  }
};
exports.saveBookAuthor = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let bookAuthor = await bookAuthorService.saveBookAuthor(formData);
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Created Successfully.",
      appData: bookAuthor,
    });
  } catch (error) {
    logger.error("Error in Save bookAuthor:", error);
    next(error);
  }
};
