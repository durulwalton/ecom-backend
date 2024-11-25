const mongoose = require("mongoose");
const throwError = require("../../utils/throwError");

const promotionSchema = new mongoose.Schema(
  {
    promoInc: {
      type: Number,
      required: true,
      default: 0,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["Percentage", "Flat"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    // For Sale Master Tabe Data Start
    maxDiscount: {
      type: Number, // Optional: Maximum discount amount (for percentage discounts)
    },
    minOrderValue: {
      type: Number, // Optional: Minimum order value to apply the promotion
    },
    // For Sale Master Tabe Data End
    usageLimit: {
      type: Number, // Total number of times the code can be used
      default: 1,
    },
    usageCount: {
      type: Number, // Tracks how many times the code has been used
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    offerOn: [{ type: mongoose.Schema.Types.ObjectId, ref: "PromotionOn" }],
    isActive: {
      type: Boolean,
      default: true,
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
promotionSchema.statics.validateCode = async function (
  code,
  currentDate = new Date()
) {
  const promo = await this.findOne({ code, isActive: true })
    .where("startDate")
    .lte(currentDate)
    .where("endDate")
    .gte(currentDate);
  if (!promo) throw throwError(`Promotion code is invalid or expired.`, 404);
  return promo;
};
const Promotion = mongoose.model("Promotion", promotionSchema);
module.exports = Promotion;
