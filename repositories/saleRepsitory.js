const mongoose = require("mongoose");
const Sale = require("../models/sale/saleModel");
const SaleChld = require("../models/sale/saleChldModel");

exports.saveSale = async (parentData, chldData) => {
  const session = await mongoose.startSession();
  const sale = new Sale(parentData);
  let chldsMapData = chldData.map((item) => {
    return {
      ...item,
      sale: sale._id,
      createdBy: parentData.createdBy,
    };
  });
  try {
    session.startTransaction();
    let insertedDocs = await SaleChld.insertMany(chldsMapData, {
      session,
    });
    insertedDocs.forEach((doc) => {
      sale.chld.push(doc._id);
    });
    sale._chldData = chldsMapData;
    await sale.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
