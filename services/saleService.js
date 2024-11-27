const saleRepo = require("../repositories/saleRepsitory");
exports.savePurchaseReturn = async (fieldsData) => {
  let parentData = {
    sales_invoice: fieldsData.sales_invoice,
    company: fieldsData.company,
    store: fieldsData.store,
    customer: fieldsData.customer,
    sales_point: fieldsData.sales_point,
    sales_man: fieldsData.sales_man,
    sales_date: fieldsData.sales_date,
    // total_sale_price,
    // offerMinOrderValue,
    // total_offer_amount,
    // promoMinOrderValue,
    // total_promo_amount,
    // isStoreOut,
  };
  let chldData = fieldsData.chld;
  if (!chldData || (chldData && !chldData.length > 0)) {
    throw throwError(`Article  Varient not select`, 400);
  }

  return saleRepo.saveSale(parentData, chldData);
};
