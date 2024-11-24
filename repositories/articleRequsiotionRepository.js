const mongoose = require("mongoose");
const ArticleRequsition = require("../models/requsition/articleRequsitionModel");
const ArticleRequsitionChld = require("../models/requsition/articleRequsitionChldModel");
const FileApprover = require("../models/approver/fileApproverModel");
const FilePath = require("../models/approver/filePathModel");
exports.getArticleRequations = async () => {
  return ArticleRequsition.find({
    status: true,
  })
    .populate({
      path: "children",
      populate: {
        path: "article articleChld",
        select: "-children",
      },
    })
    .populate("approvers")
    .select("children approvers");
};
exports.findByFields = (query) => {
  return ArticleRequsition.findOne(query);
};
exports.getArticleChlds = async () => {
  return ArticleRequsition.find({
    status: true,
  }).populate({
    path: "article",
    select: "article_Code article_Name",
  });
};
exports.saveArticleRequsition = async (parentData, chldData) => {
  const session = await mongoose.startSession();
  const articleRequsition = new ArticleRequsition(parentData);
  let chldsMapData = chldData.map((item) => {
    return {
      ...item,
      requsition: articleRequsition._id,
      createdBy: parentData.createdBy,
    };
  });
  try {
    session.startTransaction();
    await articleRequsition.save({ session });
    let insertedDocs = await ArticleRequsitionChld.insertMany(chldsMapData, {
      session,
    });
    insertedDocs.forEach((doc) => {
      articleRequsition.children.push(doc._id);
    });
    await articleRequsition.save({ session });
    let approverList = await FileApprover.find({
      fileType: "ArticleRequsition",
    }).session(session);
    let approverMap = approverList.map((item, i) => {
      return {
        file: articleRequsition.id,
        fileType: item.fileType,
        userRefCode: item.userRefCode,
        user: item.user,
        pathSL: item.pathSL,
        currentFileLoc: i == 0 ? item.userRefCode : null,
        createdBy: parentData.createdBy,
      };
    });
    let insertedFilePathDocs = await FilePath.insertMany(approverMap, {
      session,
    });
    insertedFilePathDocs.forEach((doc) => {
      articleRequsition.approvers.push(doc._id);
    });
    await articleRequsition.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
