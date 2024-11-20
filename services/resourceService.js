const resourceRepo = require("../repositories/resourceRepository");
const roleRepo = require("../repositories/roleRepository");
const throwError = require("../utils/throwError");

exports.getResources = async () => {
  return resourceRepo.getResources();
};

exports.saveResource = async (fieldsData) => {
  const checkRole = await roleRepo.getRoleByFields({
    roleKey: "administrator",
  });
  if (!checkRole) {
    throw throwError(`This Administrator Role not found!`, 404);
  }
  let resourceData = {
    name: fieldsData.name,
    apiEnd: fieldsData.apiEnd,
    createdBy: fieldsData.createdBy,
  };
  if (fieldsData.pageUrl) {
    resourceData = {
      ...resourceData,
      pageUrl: fieldsData.pageUrl,
    };
  }
  if (fieldsData.icon) {
    resourceData = {
      ...resourceData,
      icon: fieldsData.icon,
    };
  }
  if (fieldsData.resourceId) {
    resourceData = {
      ...resourceData,
      parent: fieldsData.resourceId,
    };
  }
  if (fieldsData.isSideLoc) {
    resourceData = {
      ...resourceData,
      isSideLoc: fieldsData.isSideLoc,
    };
  }
  let permissionData = {
    modelRef: checkRole.id,
    isRead: true,
    isCreate: true,
    isWrite: true,
    createdBy: fieldsData.createdBy,
  };
  return resourceRepo.saveResource(resourceData, permissionData);
};
