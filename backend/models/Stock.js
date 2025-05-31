import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantitySent: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Stock = mongoose.model("Stock", stockSchema);
