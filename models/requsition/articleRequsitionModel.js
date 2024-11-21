const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleRequsitionSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Department",
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
    approvedStage: {
      type: Number,
      required: true,
      default: 1,
    },
    totalApprover: {
      type: Number,
    },
    approvedStatus: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
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
const articleRequsition = mongoose.model(
  "articleRequsition",
  articleRequsitionSchema
);
module.exports = articleRequsition;
