const articleService = require("../services/articleService");
const logger = require("../utils/logger");

exports.getArticles = async (req, res, next) => {
  try {
    const articleList = await articleService.getArticles();
    res.status(200).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Fetch all Articles Successfully.",
      appData: articleList,
    });
  } catch (error) {
    logger.error("Error in Fetch Roles:", error);
    next(error);
  }
};
exports.saveArticle = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let resource = await articleService.saveArticle(formData);
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Article Created Successfully.",
      appData: resource,
    });
  } catch (error) {
    logger.error("Error in Save Article:", error);
    next(error);
  }
};
