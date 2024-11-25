const mongoose = require("mongoose");
const { Schema } = mongoose;

const saleChldSchema = new Schema(
  {
    sale: {
      type: Schema.Types.ObjectId,
      ref: "Sale",
      required: true,
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
    sale_rate: {
      type: Number,
      required: true,
    },
    sale_qty: {
      type: Number,
      required: true,
    },
    offer: {
      type: Schema.Types.ObjectId,
      ref: "Offer",
    },
    discountType: {
      type: String,
      enum: ["Percentage", "Flat"],
    },
    discountValue: { type: Number },
    offerStartDate: { type: Date },
    offerEndDate: { type: Date },
    promotion: {
      type: Schema.Types.ObjectId,
      ref: "Promotion",
    },
    promotionType: {
      type: String,
      enum: ["Percentage", "Flat"],
    },
    promotionValue: { type: Number },
    promotionStartDate: { type: Date },
    promotionEndDate: { type: Date },
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

const SaleChld = mongoose.model("SaleChld", saleChldSchema);

module.exports = SaleChld;
