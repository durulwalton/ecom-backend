const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
    roleKey: {
      type: String,
      maxlength: 100,
    },
    power: {
      type: Number,
    },
    note: {
      type: String,
      maxlength: 255,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);
const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
