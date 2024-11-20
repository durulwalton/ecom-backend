const authorService = require("../services/authorService");
const logger = require("../utils/logger");

exports.getAuthors = async (req, res, next) => {
  try {
    const articleList = await authorService.getAuthors();
    res.status(200).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Fetch all Author Successfully.",
      appData: articleList,
    });
  } catch (error) {
    logger.error("Error in Fetch Author:", error);
    next(error);
  }
};
exports.saveAuthor = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let resource = await authorService.saveAuthor(formData);
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Author Created Successfully.",
      appData: resource,
    });
  } catch (error) {
    logger.error("Error in Save Author:", error);
    next(error);
  }
};
