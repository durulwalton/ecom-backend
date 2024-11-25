const mongoose = require("mongoose");
const Purchase = require("../models/purchase/purchaseModel");
const PurchaseChld = require("../models/purchase/purchaseChldModel");

exports.savePurchase = async (parentData, chldData) => {
  const session = await mongoose.startSession();
  const purchase = new Purchase(parentData);
  let chldsMapData = chldData.map((item) => {
    return {
      ...item,
      purchase: purchase._id,
      createdBy: parentData.createdBy,
    };
  });
  try {
    session.startTransaction();
    // await purchase.save({ session });
    let insertedDocs = await PurchaseChld.insertMany(chldsMapData, {
      session,
    });
    insertedDocs.forEach((doc) => {
      purchase.chld.push(doc._id);
    });
    purchase._chldData = chldsMapData;
    await purchase.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
