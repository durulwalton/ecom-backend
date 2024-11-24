const mongoose = require("mongoose");
const { Schema } = mongoose;
const inventorySchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
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
    // inventoryFk: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   refPath: "invoiceType",
    // },
    // invoice: {
    //   type: String,
    //   required: true,
    // },
    // invoiceType: {
    //   type: String,
    //   enum: [
    //     "Purchase",
    //     "Purchase_Return",
    //     "Sale",
    //     "Sale_Return",
    //     "Dispatch",
    //     "Dispatch_Return",
    //   ],
    //   required: true,
    // },
    // invoicedate: {
    //   type: Date,
    //   default: null,
    // },
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
    stockIn: {
      type: Number,
      required: true,
      default: 0,
    },
    stockOut: {
      type: Number,
      required: true,
      default: 0,
    },
    netSock: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);
inventorySchema.index(
  { company: 1, store: 1, supplier: 1, article: 1, articleChld: 1 },
  { unique: true }
);
const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
