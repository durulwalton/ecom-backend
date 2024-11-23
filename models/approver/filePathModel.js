const mongoose = require("mongoose");
const { Schema } = mongoose;

const filePathSchema = new Schema(
  {
    file: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "fileType",
    },
    fileType: {
      type: String,
      required: true,
      enum: ["ArticleRequsition"],
      default: "ArticleRequsition",
    },
    userRefCode: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pathSL: {
      type: Number,
      required: true,
      default: 1,
    },
    currentFileLoc: {
      type: String,
    },
    approvedStatus: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
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

const FilePath = mongoose.model("FilePath", filePathSchema);
module.exports = FilePath;
