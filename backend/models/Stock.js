// models/stock-model.js
import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming الفرع هو مستخدم
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

stockSchema.index({ branch: 1, product: 1 }, { unique: true });

export const Stock = mongoose.model("Stock", stockSchema);
