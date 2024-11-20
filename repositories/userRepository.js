const User = require("../models/userModel");
const Permisssion = require("../models/permissionModel");
const Resource = require("../models/resourceModel");

const findUserById = (id) => {
  return User.findById({ _id: id }).select("-password");
};
const findByEmail = (email) => {
  return User.findOne({ email }).select("+password");
};
const findByFields = (query) => {
  return User.findOne(query).select("+password");
};
const createUser = (userData) => {
  return User.create(userData);
};
const updateUser = (userId, updateData) => {
  return User.findByIdAndUpdate(userId, updateData, { new: true });
};
const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};
const findAuthUserById = async (id) => {
  let user = await User.findById({ _id: id })
    .populate({
      path: "role",
      select: "name",
    })
    .select("-password")
    .exec();
  let authResources = await Permisssion.find({
    modelRef: { $in: [user.role._id, user.id] },
  })
    .populate({ path: "resource", select: "name apiEnd", model: Resource })
    .select("modelType isRead isCreate isWrite -_id")
    .exec();
  user = user.toObject();
  let reduceData = authResources.reduce((acc, item) => {
    let itemObj = item.toObject();
    if (!acc[itemObj.resource._id.toString()] || itemObj.modelType == "User") {
      acc[itemObj.resource._id.toString()] = {
        _id: itemObj.resource._id,
        name: itemObj.resource.name,
        apiEnd: itemObj.resource.apiEnd,
        modelType: itemObj.modelType,
        isRead: itemObj.isRead,
        isCreate: itemObj.isCreate,
        isWrite: itemObj.isWrite,
      };
    }
    return acc;
  }, {});
  let result = {
    _id: user._id,
    userName: user.userName,
    countryCode: user.countryCode,
    phoneNumber: user.phoneNumber,
    email: user.email,
    modelRef: {
      _id: user.role._id,
      name: user.role.name,
      resources: Object.values(reduceData),
    },
  };
  return result;
};
module.exports = {
  findUserById,
  findByEmail,
  findByFields,
  createUser,
  updateUser,
  deleteUser,
  findAuthUserById,
};
