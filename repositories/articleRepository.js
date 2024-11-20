const mongoose = require("mongoose");
const Article = require("../models/articleModel");
const ArticleChld = require("../models/articleChldModel");

exports.getArticles = async () => {
  return Article.find({
    status: true,
  }).populate({
    path: "children",
    select: "articleSku sell_price",
  });
};
exports.findByFields = (query) => {
  return Article.findOne(query);
};
exports.getArticleChlds = async () => {
  return ArticleChld.find({
    status: true,
  }).populate({
    path: "article",
    select: "article_Code article_Name",
  });
};
exports.saveArticle = async (articleData, chldData) => {
  const session = await mongoose.startSession();
  const article = new Article(articleData);
  let chldsMapData = chldData.map((item) => {
    return {
      ...item,
      article: article._id,
      createdBy: articleData.createdBy,
    };
  });
  try {
    session.startTransaction();
    await article.save({ session });
    let insertedDocs = await ArticleChld.insertMany(chldsMapData, { session });
    insertedDocs.forEach((doc) => {
      article.children.push(doc._id);
    });
    await article.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
