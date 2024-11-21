const userService = require("../services/userService");

exports.read = async (req, res, next) => {
  try {
    const user = await userService.findAuthUserById(req.user.id);
    if (!user) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient permissions.",
        data: null,
      });
    }
    let resources = user.modelRef.resources;
    let findResource = resources.find((item) => {
      return item.apiEnd == req.originalUrl;
    });
    if (!findResource) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient permissions.",
        data: null,
      });
    }
    if (!findResource.isRead) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient Read permissions.",
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      appStatus: false,
      appCode: 403,
      appMessage: "Access denied: insufficient permissions.",
      data: null,
    });
  }
};
exports.create = async (req, res, next) => {
  try {
    const user = await userService.findAuthUserById(req.user.id);
    if (!user) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient permissions.",
        data: null,
      });
    }
    let resources = user.modelRef.resources;
    let findResource = resources.find((item) => {
      return item.apiEnd == req.originalUrl;
    });
    if (!findResource) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient permissions.",
        data: null,
      });
    }
    if (!findResource.isCreate) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient Create permissions.",
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      appStatus: false,
      appCode: 403,
      appMessage: "Access denied: insufficient permissions.",
      data: null,
    });
  }
};
exports.write = async (req, res, next) => {
  try {
    const user = await userService.findAuthUserById(req.user.id);
    if (!user) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient permissions.",
        data: null,
      });
    }
    let resources = user.modelRef.resources;
    let findResource = resources.find((item) => {
      return item.apiEnd == req.originalUrl;
    });
    if (!findResource) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient permissions.",
        data: null,
      });
    }
    if (!findResource.isWrite) {
      return res.status(403).json({
        appStatus: false,
        appCode: 403,
        appMessage: "Access denied: insufficient Write permissions.",
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      appStatus: false,
      appCode: 403,
      appMessage: "Access denied: insufficient permissions.",
      data: null,
    });
  }
};
