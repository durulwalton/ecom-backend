const purchaseReturnRepo = require("../repositories/purchaseReturnRepository");
exports.savePurchaseReturn = async (fieldsData) => {
  let parentData = {
    return_invoice: fieldsData.return_invoice,
    company: fieldsData.company,
    store: fieldsData.store,
    supplier: fieldsData.supplier,
    return_date: fieldsData.return_date,
    createdBy: fieldsData.createdBy,
  };
  let chldData = fieldsData.chld;
  if (!chldData || (chldData && !chldData.length > 0)) {
    throw throwError(`Article  Varient not select`, 400);
  }
  return purchaseReturnRepo.savePurchaseReturn(parentData, chldData);
};
