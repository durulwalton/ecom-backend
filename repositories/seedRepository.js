const mongoose = require("mongoose");
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const Resource = require("../models/resourceModel");
const Permisssion = require("../models/permissionModel");
const ObjectId = mongoose.Types.ObjectId;
const seedData = async (session) => {
  const userId = new ObjectId();
  const roleId = new ObjectId();
  // Create Supper User
  const userData = {
    _id: userId,
    userName: "System",
    countryCode: "+88",
    phoneNumber: "01726720772",
    email: "system@gmail.com",
    password: "123456789",
    role: roleId,
    createdBy: userId,
  };
  const user = new User(userData);
  await user.save({ session });
  // Create Role
  const roleData = {
    _id: roleId,
    name: "Administrator",
    roleKey: "administrator",
    power: 7,
    note: "All Access",
    createdBy: userId,
  };
  const role = new Role(roleData);
  await role.save({ session });
  // Create User Related Api End
  const userProfileResource = new Resource({
    name: "Profile",
    pageUrl: "/profile",
    apiEnd: "/api/users/profile",
    icon: "",
    isSideLoc: false,
    createdBy: userId,
  });
  // Create Resourse
  const userManagResource = new Resource({
    name: "User Management",
    pageUrl: "",
    apiEnd: "",
    icon: "",
    createdBy: userId,
  });
  // Role Related Api End
  const roleResource = new Resource({
    name: "Role",
    pageUrl: "/role",
    apiEnd: "/api/roles/index",
    icon: "",
    parent: userManagResource._id,
    createdBy: userId,
  });
  const roleResourceCreate = new Resource({
    name: "Role Create",
    pageUrl: "/role",
    apiEnd: "/api/roles/store",
    icon: "",
    parent: userManagResource._id,
    isSideLoc: false,
    createdBy: userId,
  });
  const roleResourceShow = new Resource({
    name: "Role Show",
    pageUrl: "/role",
    apiEnd: "/api/roles/show",
    icon: "",
    parent: userManagResource._id,
    isSideLoc: false,
    createdBy: userId,
  });
  const roleResourceUpdate = new Resource({
    name: "Role Update",
    pageUrl: "/role",
    apiEnd: "/api/roles/",
    icon: "",
    parent: userManagResource._id,
    isSideLoc: false,
    createdBy: userId,
  });
  const roleResourceDel = new Resource({
    name: "Role Delete",
    pageUrl: "/role",
    apiEnd: "/api/roles/",
    icon: "",
    parent: userManagResource._id,
    isSideLoc: false,
    createdBy: userId,
  });
  // Resource Related Api End
  const rResource = new Resource({
    name: "Resources",
    pageUrl: "/resources",
    apiEnd: "/api/resources/index",
    icon: "",
    parent: userManagResource._id,
    createdBy: userId,
  });
  const rResourceCreate = new Resource({
    name: "Resources Create",
    pageUrl: "/resources",
    apiEnd: "/api/resources/store",
    icon: "",
    parent: userManagResource._id,
    isSideLoc: false,
    createdBy: userId,
  });
  const rResourceShow = new Resource({
    name: "Resources Show",
    pageUrl: "/resources",
    apiEnd: "/api/resources/show",
    icon: "",
    parent: userManagResource._id,
    isSideLoc: false,
    createdBy: userId,
  });
  const rResourceUpdate = new Resource({
    name: "Resources Update",
    pageUrl: "/resources",
    apiEnd: "/api/resources/",
    icon: "",
    parent: userManagResource._id,
    isSideLoc: false,
    createdBy: userId,
  });
  const rResourceDel = new Resource({
    name: "Resources Delete",
    pageUrl: "/resources",
    apiEnd: "/api/resources/",
    icon: "",
    parent: userManagResource._id,
    isSideLoc: false,
    createdBy: userId,
  });
  await Resource.insertMany(
    [
      userManagResource,
      userProfileResource,
      roleResource,
      roleResourceCreate,
      roleResourceShow,
      roleResourceUpdate,
      roleResourceDel,
      rResource,
      rResourceCreate,
      rResourceShow,
      rResourceUpdate,
      rResourceDel,
    ],
    { session }
  );
  // Create Permission
  const roleResourceData = [
    {
      modelRef: roleId,
      resource: userManagResource._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: userProfileResource._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: roleResource._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: roleResourceCreate._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: roleResourceShow._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: roleResourceUpdate._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: roleResourceDel._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: rResource._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: rResourceCreate._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: rResourceShow._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: rResourceUpdate._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
    {
      modelRef: roleId,
      resource: rResourceDel._id,
      isRead: true,
      isCreate: true,
      isWrite: true,
      createdBy: userId,
    },
  ];
  await Permisssion.insertMany(roleResourceData, { session });
};
const findByEmail = async (email = "system@gmail.com") => {
  return await User.findOne({ email }).select("+password");
};
module.exports = {
  seedData,
  findByEmail,
};
