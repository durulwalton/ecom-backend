const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    source_company: {
      type: Schema.Types.ObjectId,
      ref: "SourceCompany",
      default: null,
    },
    article_Code: {
      type: String,
      required: true,
      unique: true,
    },
    article_Name: {
      type: String,
      required: true,
      unique: true,
    },
    generic_Name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Third"],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    sub_Brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    sub_Category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    sub_Sub_Category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    article_type: {
      type: String,
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "ArticleChld" }],
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
const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
