const roleRepo = require("../repositories/roleRepository");
const resourceRepo = require("../repositories/resourceRepository");
const permissionRepo = require("../repositories/permissionRepository");

const getAllRole = async () => {
  return roleRepo.getAllRole();
};

const getRoleById = async (id) => {
  return roleRepo.getRoleById(id);
};
const getRoleByFields = async (fields) => {
  return roleRepo.getRoleByFields(fields);
};
const createRole = async () => {
  const resources = await resourceRepo.getResources();
  let resourcesMap = resources.map((item) => {
    let permisionObj = {
      resource: item.id,
      name: item.name,
      isRead: false,
      isCreate: false,
      isWrite: false,
    };
    return permisionObj;
  });
  return resourcesMap;
};
const saveRole = async (fieldsData, session) => {
  const checkRole = await roleRepo.getRoleByFields({
    name: fieldsData.name,
  });
  if (checkRole && checkRole.name.trim() == fieldsData.name.trim()) {
    const error = new Error(`This ${fieldsData.name} already exists!`);
    error.status = 400;
    throw error;
  }
  if (
    !fieldsData.permissions ||
    (fieldsData.permissions && !fieldsData.permissions.length > 0)
  ) {
    const error = new Error(`Please Select at least one Resource!`);
    error.status = 400;
    throw error;
  }
  return roleRepo.saveRole(fieldsData, session);
};
const editRole = async (roleId) => {
  const role = await roleRepo.getRoleWithResource(roleId);
  if (!role) {
    const error = new Error(`Role With the given id ${roleId} is not found!`);
    error.status = 404;
    throw error;
  }
  const permissions = await permissionRepo.getPermissionsByRole(roleId);
  const resources = await resourceRepo.getResources();
  let resourcesMerge = resources.reduce((acc, item) => {
    let findPermission = permissions.find((pItem) => {
      return item.id == pItem.resource;
    });
    let permisionObj = {};
    if (findPermission) {
      permisionObj = {
        ...permisionObj,
        resource: findPermission.resource,
        isRead: findPermission.isRead,
        isCreate: findPermission.isCreate,
        isWrite: findPermission.isWrite,
      };
    } else {
      permisionObj = {
        ...permisionObj,
        isRead: false,
        isCreate: false,
        isWrite: false,
      };
    }
    if (!acc[item.id]) {
      acc[item.id] = {
        resource: item.id,
        name: item.name,
        ...permisionObj,
      };
    }
    return acc;
  }, {});
  return { ...role.toObject(), permissions: Object.values(resourcesMerge) };
};
const updateRole = async (roleId, fieldsData, session) => {
  const role = await roleRepo.getRoleWithResource(roleId);
  if (!role) {
    const error = new Error(`Role With the given id ${roleId} is not found!`);
    error.status = 404;
    throw error;
  }
  const checkRole = await roleRepo.getRoleByFields({
    name: fieldsData.name,
  });
  if (
    role.name.trim() != fieldsData.name.trim() &&
    checkRole.name.trim() == fieldsData.name.trim()
  ) {
    const error = new Error(`This ${fieldsData.name} already exists!`);
    error.status = 400;
    throw error;
  }
  if (
    !fieldsData.permissions ||
    (fieldsData.permissions && !fieldsData.permissions.length > 0)
  ) {
    const error = new Error(`Please Select at least one Resource!`);
    error.status = 400;
    throw error;
  }
  return roleRepo.updateRole(roleId, fieldsData, session);
};
const removeRole = async (id, fieldsData) => {
  return roleRepo.removeRole(id, fieldsData);
};
module.exports = {
  getAllRole,
  getRoleById,
  getRoleByFields,
  createRole,
  saveRole,
  editRole,
  updateRole,
  removeRole,
};
