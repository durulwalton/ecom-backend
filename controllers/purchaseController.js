const purchaseService = require("../services/purchaseService");
const logger = require("../utils/logger");

exports.savePurchase = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let resource = await purchaseService.savePurchase(formData);
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Purchase Successfully.",
      appData: resource,
    });
  } catch (error) {
    logger.error("Error in Save Purchase:", error);
    next(error);
  }
};
