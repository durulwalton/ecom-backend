const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleChldSchema = new Schema(
  {
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    articleSku: {
      type: String,
      required: true,
      unique: true,
    },
    sell_price: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    seo_title: {
      type: String,
    },
    seo_description: {
      type: String,
    },
    seo_keywords: {
      type: String,
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
const ArticleChld = mongoose.model("ArticleChld", articleChldSchema);
module.exports = ArticleChld;
