const articleRepo = require("../repositories/articleRepository");
const throwError = require("../utils/throwError");

exports.getArticles = async () => {
  return articleRepo.getArticles();
};

exports.saveArticle = async (fieldsData) => {
  let articleData = {
    article_Code: fieldsData.article_Code,
    article_Name: fieldsData.article_Name,
    createdBy: fieldsData.createdBy,
  };
  let chldData = fieldsData.chld;
  if (!chldData || (chldData && !chldData.length > 0)) {
    throw throwError(`Article Varient not select`, 400);
  }
  const { article_Code, article_Name } = fieldsData;
  const article = await articleRepo.findByFields({
    $or: [{ article_Code }, { article_Name }],
  });
  if (article) {
    throw throwError(`Article Code and Article Name must be unique`, 400);
  }
  return articleRepo.saveArticle(articleData, chldData);
};
