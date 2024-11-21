const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileApproverSchema = new Schema(
  {
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

const FileApprover = mongoose.model("FileApprover", fileApproverSchema);
module.exports = FileApprover;
