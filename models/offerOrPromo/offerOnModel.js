const mongoose = require("mongoose");

const offerOnSchema = new mongoose.Schema(
  {
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    targetType: {
      type: String,
      required: true,
      enum: ["Company", "Store", "Category", "Brand", "Article"],
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
const OfferOn = mongoose.model("OfferOn", offerOnSchema);
module.exports = OfferOn;
