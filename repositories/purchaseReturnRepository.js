const mongoose = require("mongoose");
const PurchaseReturn = require("../models/purchase/PurchaseReturnModel");
const PurchaseReturnChld = require("../models/purchase/PurchaseReturnChldModel");

exports.savePurchaseReturn = async (parentData, chldData) => {
  const session = await mongoose.startSession();
  const purchaseReturn = new PurchaseReturn(parentData);
  let chldsMapData = chldData.map((item) => {
    return {
      ...item,
      purchase_return: purchaseReturn._id,
      createdBy: parentData.createdBy,
    };
  });
  try {
    session.startTransaction();
    let insertedDocs = await PurchaseReturnChld.insertMany(chldsMapData, {
      session,
    });
    insertedDocs.forEach((doc) => {
      purchaseReturn.chld.push(doc._id);
    });
    purchaseReturn._chldData = chldsMapData;
    await purchaseReturn.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
