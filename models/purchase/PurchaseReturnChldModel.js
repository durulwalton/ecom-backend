const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaseReturnChldSchema = new Schema(
  {
    purchase_return: {
      type: Schema.Types.ObjectId,
      ref: "PurchaseReturn",
      default: null,
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    articleChld: {
      type: Schema.Types.ObjectId,
      ref: "ArticleChld",
      required: true,
    },
    return_qty: {
      type: Number,
      required: true,
    },
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

const PurchaseReturnChld = mongoose.model(
  "PurchaseReturnChld",
  purchaseReturnChldSchema
);

module.exports = PurchaseReturnChld;
