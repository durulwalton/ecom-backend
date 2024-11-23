const fileApproverRepo = require("../repositories/fileApproverRepository");
const throwError = require("../utils/throwError");

exports.getFileApprovers = async () => {
  return fileApproverRepo.getFileApprovers();
};
exports.saveFileApprover = async (data) => {
  // You Hove to Check userRefCode so that it can be different base on fileType
  const checkFileApproverRefCode = await fileApproverRepo.findByFields({
    fileType: "ArticleRequsition",
    userRefCode: data.userRefCode,
  });
  if (checkFileApproverRefCode) {
    throw throwError(`This Requsition Refcode already Exist!`, 400);
  }
  const checkFileApproverUser = await fileApproverRepo.findByFields({
    fileType: "ArticleRequsition",
    user: data.user,
  });
  if (checkFileApproverUser) {
    throw throwError(`User with Requsition Refcode already Exist!`, 400);
  }
  let pathSL = 0;
  const result = await fileApproverRepo.getFileApproversByFields({
    fileType: "ArticleRequsition",
  });
  if (!data.pathSL) {
    pathSL = result[0].fileType + 1;
  } else {
    pathSL = data.pathSL;
  }
  return fileApproverRepo.saveFileApprover({ ...data, pathSL: 20 });
};
