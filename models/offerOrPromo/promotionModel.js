const mongoose = require("mongoose");
const throwError = require("../../utils/throwError");

const promotionSchema = new mongoose.Schema(
  {
    promoInc: {
      type: Number,
      required: true,
      default: 0,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    promoCode: {
      type: String,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
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
    maxDiscountAmount: {
      type: Number, // Optional: Limits the maximum discount value. For example, if the discount type is a percentage, it could cap the discount to a certain dollar amount.
    },
    minOrderValue: {
      type: Number, // Optional: The minimum order amount that must be met for the promotion to apply
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
    userTypes: {
      type: [String],
      enum: ["new", "registered", "guest"],
      default: ["new", "registered"],
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
