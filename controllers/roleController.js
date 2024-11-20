const mongoose = require("mongoose");
const roleService = require("../services/roleService");
const logger = require("../utils/logger");

const getAllRole = async (req, res, next) => {
  try {
    const roleList = await roleService.getAllRole();
    res.status(200).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Fetch all Role Successfully.",
      appData: roleList,
    });
  } catch (error) {
    logger.error("Error in Fetch Roles:", error);
    next(error);
  }
};

const showRole = async (req, res, next) => {
  let roleId = req.params.id;
  try {
    const role = await roleService.getRoleById(roleId);
    res.status(200).json({
      appStatus: true,
      appCode: 200,
      appMessage: "Fetch Role  Successfully.",
      appData: role,
    });
  } catch (error) {
    logger.error("Error in register:", error);
    next(error);
  }
};
const createRole = async (req, res, next) => {
  let roleId = req.params.id;
  try {
    const role = await roleService.createRole();
    res.status(200).json({
      appStatus: true,
      appCode: 200,
      appMessage: "Fetch Role  Successfully.",
      appData: role,
    });
  } catch (error) {
    logger.error("Error in register:", error);
    next(error);
  }
};
const saveRole = async (req, res, next) => {
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
  };
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let role = await roleService.saveRole(formData, session);
    await session.commitTransaction();
    res.status(201).json({
      appStatus: true,
      appCode: 201,
      appMessage: "Role Created Successfully.",
      appData: role,
    });
  } catch (error) {
    logger.error("Error in Save Role:", error);
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
const editRole = async (req, res, next) => {
  let roleId = req.params.id;
  try {
    const role = await roleService.editRole(roleId);
    res.status(200).json({
      appStatus: true,
      appCode: 200,
      appMessage: "Fetch Role  Successfully.",
      appData: role,
    });
  } catch (error) {
    logger.error("Error in Edit Role:", error.message);
    next(error);
  }
};
const updateRole = async (req, res, next) => {
  let roleId = req.params.id;
  let formData = req.body;
  let authUser = req.user;
  formData = {
    ...formData,
    createdBy: authUser.id,
    updatedBy: authUser.id,
  };
  try {
    let role = await roleService.updateRole(roleId, formData);
    res.status(200).json({
      appStatus: true,
      appCode: 200,
      appMessage: "Role Update Successfully.",
      appData: role,
    });
  } catch (error) {
    logger.error("Error in Save Role:", error);
    next(error);
  }
};
const removeRole = async (req, res) => {
  return roleService.removeRole(id, fieldsData);
};

module.exports = {
  getAllRole,
  showRole,
  createRole,
  saveRole,
  editRole,
  updateRole,
  removeRole,
};
