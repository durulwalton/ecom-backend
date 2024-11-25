const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaseChldSchema = new Schema(
  {
    purchase: {
      type: Schema.Types.ObjectId,
      ref: "Purchase",
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
    purchase_rate: {
      type: Number,
      required: true,
    },
    purchase_qty: {
      type: Number,
      required: true,
    },
    purchase_line: {
      type: Number,
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

const PurchaseChld = mongoose.model("PurchaseChld", purchaseChldSchema);

module.exports = PurchaseChld;
