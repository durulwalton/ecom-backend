const mongoose = require("mongoose");
const Permisssion = require("../models/permissionModel");
const Role = require("../models/roleModel");

const getAllRole = () => {
  return Role.find();
};
const getRoleById = (id) => {
  return Role.findOne({ _id: id });
};
function getRoleByFields(fields) {
  return Role.findOne(fields);
}
const saveRole = async (fieldsData) => {
  const session = await mongoose.startSession();
  let roleData = {
    name: fieldsData.name,
    roleKey: fieldsData.roleKey,
    power: fieldsData.power,
    note: fieldsData.note,
    createdBy: fieldsData.createdBy,
  };
  const role = new Role(roleData);
  let permisionsObj = fieldsData.permissions.map((item) => {
    return {
      ...item,
      modelRef: role._id,
      createdBy: fieldsData.createdBy,
    };
  });
  try {
    session.startTransaction();
    await role.save({ session });
    await Permisssion.insertMany(permisionsObj, { session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const updateRole = async (roleId, fieldsData) => {
  const session = await mongoose.startSession();
  let roleData = {
    name: fieldsData.name,
    roleKey: fieldsData.roleKey,
    power: fieldsData.power,
    note: fieldsData.note,
    updatedBy: fieldsData.updatedBy,
  };
  let permisionsObj = fieldsData.permissions.map((item) => {
    return {
      updateOne: {
        filter: { modelRef: roleId, resource: item.resource },
        update: {
          $set: {
            isRead: item.isRead,
            isCreate: item.isCreate,
            isWrite: item.isWrite,
            createdBy: fieldsData.createdBy,
            updatedBy: fieldsData.updatedBy,
          },
        },
        upsert: true,
      },
    };
  });
  try {
    session.startTransaction();
    await Role.findByIdAndUpdate(roleId, roleData, { new: true, session });
    await Permisssion.bulkWrite(permisionsObj, { session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const removeRole = (id) => {
  return Role.findByIdAndDelete(id);
};
const getRoleWithResource = (id) => {
  return Role.findOne({ _id: id }).select("name");
};
module.exports = {
  getAllRole,
  getRoleById,
  getRoleByFields,
  saveRole,
  updateRole,
  removeRole,
  getRoleWithResource,
};
