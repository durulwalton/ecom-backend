const fileApproverService = require("../services/fileApproverService");
const logger = require("../utils/logger");

exports.getFileApprovers = async (req, res, next) => {
  try {
    const articleList = await fileApproverService.getFileApprovers();
    res.status(200).json({
      appStatus: true,
      appCode: 200,
      appMessage: "Fetch all File Approvers Successfully.",
      appData: articleList,
    });
  } catch (error) {
    logger.error("Error in Fetch file Approver:", error);
    next(error);
  }
};
exports.saveFileApprover = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let fileApprover = await fileApproverService.saveFileApprover(formData);
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Created Successfully.",
      appData: fileApprover,
    });
  } catch (error) {
    logger.error("Error in Save File Approver:", error);
    next(error);
  }
};
