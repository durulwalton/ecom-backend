const purchaseReturnService = require("../services/purchaseReturnService");
const logger = require("../utils/logger");

exports.savePurchaseReturn = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  try {
    let resource = await purchaseReturnService.savePurchaseReturn(formData);
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Purchase Return Successfully.",
      appData: resource,
    });
  } catch (error) {
    logger.error("Error in Save Purchase Return:", error);
    next(error);
  }
};
