const mongoose = require("mongoose");
const Resource = require("../models/resourceModel");
const Permisssion = require("../models/permissionModel");
exports.getResources = async () => {
  return Resource.find({
    status: true,
  }).select("name");
};
exports.saveResource = async (resourceData, permissionData) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const resource = new Resource(resourceData);
    const permission = new Permisssion({
      ...permissionData,
      resource: resource._id,
    });
    await resource.save({ session });
    await permission.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
