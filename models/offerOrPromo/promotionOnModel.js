const mongoose = require("mongoose");

const promotionOnSchema = new mongoose.Schema(
  {
    promotion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion",
      required: true,
    },
    targetType: {
      type: String,
      required: true,
      enum: ["Company", "Store", "Category", "Brand", "Article", "Customer"],
      default: "Category",
    },
    targetRef: {
      type: Schema.Types.ObjectId, // Could reference Product, Category, or User models
      required: true,
      refPath: "targetType",
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
const PromotionOn = mongoose.model("PromotionOn", promotionOnSchema);
module.exports = PromotionOn;
