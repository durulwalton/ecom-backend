const mongoose = require("mongoose");
const { Schema } = mongoose;
const Inventory = require("./inventoryModel");
const purchaseSchema = new Schema(
  {
    purchase_ref: {
      type: String,
      required: true,
    },
    purchase_invoice: {
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
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      default: null,
    },
    purchase_date: {
      type: Date,
    },
    chld: [{ type: mongoose.Schema.Types.ObjectId, ref: "PurchaseChld" }],
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
            stockIn: item.purchase_qty,
            netSock: item.purchase_qty,
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
const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
