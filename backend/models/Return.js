import mongoose from "mongoose";

const returnSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantityReturned: {
      type: Number,
      required: true,
      min: 1,
    },
    reason: {
      type: String,
      default: "",
    },
    returnDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Return = mongoose.model("Return", returnSchema);
