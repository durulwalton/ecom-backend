const purchaseRepo = require("../repositories/purchaseRepository");
exports.savePurchase = async (fieldsData) => {
  let parentData = {
    purchase_ref: fieldsData.purchase_ref,
    purchase_invoice: fieldsData.purchase_invoice,
    company: fieldsData.company,
    store: fieldsData.store,
    supplier: fieldsData.supplier,
    purchase_date: fieldsData.purchase_date,
    createdBy: fieldsData.createdBy,
  };
  let chldData = fieldsData.chld;
  if (!chldData || (chldData && !chldData.length > 0)) {
    throw throwError(`Article  Varient not select`, 400);
  }
  
  return purchaseRepo.savePurchase(parentData, chldData);
};
