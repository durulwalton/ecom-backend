const articleRepo = require("../repositories/articleRepository");
const articleRequsationRepo = require("../repositories/articleRequsiotionRepository");
const throwError = require("../utils/throwError");

exports.getArticleRequations = async () => {
  return articleRequsationRepo.getArticleRequations();
};

exports.saveArticleRequsition = async (fieldsData) => {
  let articleData = {
    createdBy: fieldsData.createdBy,
  };
  let chldData = fieldsData.chld;
  if (!chldData || (chldData && !chldData.length > 0)) {
    throw throwError(`Article  Varient not select`, 400);
  }
  return articleRequsationRepo.saveArticleRequsition(articleData, chldData);
};
