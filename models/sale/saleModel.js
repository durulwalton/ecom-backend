const mongoose = require("mongoose");
const { Schema } = mongoose;
const Inventory = require("./inventoryModel");
const saleSchema = new Schema(
  {
    sales_invoice: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      default: null,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
    sales_point: {
      type: Schema.Types.ObjectId,
      ref: "SalePoint",
      default: null,
    },
    sales_man: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sales_date: {
      type: Date,
    },
    total_sale_price: {
      type: Number,
    },
    offerMinOrderValue: {
      type: Number,
    },
    total_offer_amount: {
      type: Number,
    },
    promoMinOrderValue: {
      type: Number,
    },
    total_promo_amount: {
      type: Number,
    },
    isStoreOut: {
      type: Boolean,
      required: true,
      default: false,
    },
    chld: [{ type: mongoose.Schema.Types.ObjectId, ref: "SaleChld" }],
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);
purchaseSchema.post("save", async function (doc, next) {
  let inventoryObjs = this._chldData.map((item) => {
    return {
      updateOne: {
        filter: {
          company: item.company,
          store: item.store,
          supplier: item.supplier,
          article: item.article,
          articleChld: item.articleChld,
        },
        update: {
          $inc: {
            stockOut: item.return_qty,
            netSock: -item.return_qty,
          },
        },
        upsert: true,
      },
    };
  });
  const session = this.$session();
  await Inventory.bulkWrite(inventoryObjs, { session });
  next();
});
const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
