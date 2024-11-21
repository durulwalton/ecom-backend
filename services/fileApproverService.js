const fileApproverRepo = require("../repositories/fileApproverRepository");
const throwError = require("../utils/throwError");

exports.getFileApprovers = async () => {
  return fileApproverRepo.getFileApprovers();
};
exports.saveFileApprover = async (data) => {
  const checkFileApprover = await fileApproverRepo.findByFields({
    fileType: "ArticleRequsition",
    user: data.user,
    pathSL: data.pathSL,
    userRefCode: data.userRefCode,
  });
  if (checkFileApprover) {
    throw throwError(`This Requsition already assign with User!`, 400);
  }
  return fileApproverRepo.saveFileApprover(data);
};
