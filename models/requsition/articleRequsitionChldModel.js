const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleRequsitionChldSchema = new Schema(
  {
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    articleChld: {
      type: Schema.Types.ObjectId,
      ref: "ArticleChld",
      required: true,
    },
    purchase_rate: {
      type: String,
      required: true,
    },
    req_qty: {
      type: Number,
      required: true,
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
const ArticleRequsitionChld = mongoose.model(
  "ArticleRequsitionChld",
  articleRequsitionChldSchema
);
module.exports = ArticleRequsitionChld;
