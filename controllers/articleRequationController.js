const articleRequsitionService = require("../services/articleRequsitionService");
const logger = require("../utils/logger");

exports.getArticleRequations = async (req, res, next) => {
  try {
    const articleList = await articleRequsitionService.getArticleRequations();
    res.status(200).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Fetch all Article Requations Successfully.",
      appData: articleList,
    });
  } catch (error) {
    logger.error("Error in Fetch Roles:", error);
    next(error);
  }
};
exports.saveArticleRequsition = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let resource = await articleRequsitionService.saveArticleRequsition(
      formData
    );
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Article Requation Created Successfully.",
      appData: resource,
    });
  } catch (error) {
    logger.error("Error in Save Article Requation:", error);
    next(error);
  }
};
