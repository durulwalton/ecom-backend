const mongoose = require("mongoose");
const { Schema } = mongoose;

const resourseSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
    pageUrl: {
      type: String,
    },
    apiEnd: {
      type: String,
    },
    icon: {
      type: String,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Resource",
      default: null,
    },
    orderNo: {
      type: Number,
    },
    isSideLoc: {
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
const Resource = mongoose.model("Resource", resourseSchema);
module.exports = Resource;
