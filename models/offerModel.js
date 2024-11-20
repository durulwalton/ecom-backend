const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g., "Black Friday Sale"
    description: { type: String }, // e.g., "Up to 50% off"
    offerItems: [
      {
        offerItem: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "offerType",
        },
        discountType: {
          type: String,
          enum: ["percentage", "fixed"],
          required: true,
          default: "fixed",
        },
        discountValue: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
    offerType: {
      type: String,
      required: true,
      enum: ["Company", "Store", "Category", "Brand", "Article"],
      default: "Category",
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
const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
