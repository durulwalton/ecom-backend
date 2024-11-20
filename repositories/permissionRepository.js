const Permission = require("../models/permissionModel");
// Get Permission By Role
exports.getPermissionsByRole = async (roleId) => {
  return Permission.find({
    modelRef: roleId,
    modelType: "Role",
  });
};
