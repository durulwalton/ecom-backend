const mongoose = require("mongoose");
// Have To Offer wise and history log
const offerSchema = new mongoose.Schema(
  {
    offerInc: {
      type: Number,
      required: true,
      default: 0,
    },
    title: { type: String, required: true }, // e.g., "Black Friday Sale"
    description: { type: String }, // e.g., "Up to 50% off"
    offerOn: [{ type: mongoose.Schema.Types.ObjectId, ref: "OfferOn" }],
    discountType: {
      type: String,
      enum: ["Percentage", "Flat"],
      required: true,
      default: "Flat",
    },
    discountValue: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
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
const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
