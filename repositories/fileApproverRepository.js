const FileApprover = require("../models/approver/fileApproverModel");

exports.getFileApprovers = async () => {
  return FileApprover.find();
};
exports.getFileApproversByFields = async (query) => {
  return FileApprover.aggregate(query).count("fileType");
};
exports.getFileApproverById = (id) => {
  return FileApprover.findById(id);
};
exports.findByFields = (query) => {
  return FileApprover.findOne(query);
};

exports.saveFileApprover = (data) => {
  return FileApprover.create(data);
};
