const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    appStatus: false,
    appCode: err.status || 500,
    appMessage: err.message || "Server Error",
    data: null,
  });
};

module.exports = errorHandler;
