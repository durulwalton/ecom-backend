const mongoose = require("mongoose");
const { Schema } = mongoose;

const permissionSchema = new Schema(
  {
    modelRef: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "modelType",
    },
    resource: { type: Schema.Types.ObjectId, ref: "Resource", required: true },
    modelType: {
      type: String,
      required: true,
      enum: ["Role", "User"],
      default: "Role",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isCreate: {
      type: Boolean,
      default: false,
    },
    isWrite: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
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
const Permisssion = mongoose.model("Permisssion", permissionSchema);
module.exports = Permisssion;
