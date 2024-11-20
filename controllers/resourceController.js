const resourceService = require("../services/resourceService");
const logger = require("../utils/logger");

exports.getResources = async (req, res, next) => {
  try {
    const resourceList = await resourceService.getResources();
    res.status(200).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Fetch all Resources Successfully.",
      appData: resourceList,
    });
  } catch (error) {
    logger.error("Error in Fetch Roles:", error);
    next(error);
  }
};
exports.saveResource = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let resource = await resourceService.saveResource(formData);
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Resource Created Successfully.",
      appData: resource,
    });
  } catch (error) {
    logger.error("Error in Save Resource:", error);
    next(error);
  }
};
