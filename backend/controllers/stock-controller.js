import { Product } from "../models/Product.js";
import { Stock } from "../models/Stock.js";

export const upsertStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const branchId = req.user._id;

    //checking for product
    const productExist = Product.findById(productId);
    if (!productExist) {
      return res.status(404).json({ message: "Product not found" });
    }

    // updating the stock

    const stock = await Stock.findOneAndUpdate(
      { branch: branchId, product: productId },
      { $inc: { quantity: quantity } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "Stock updated", stock });
  } catch (error) {
    console.error("Error with updating stock", error.message);
    res.status(500).json({ message: "server error" });
  }
};

export const getBranchStock = async (req, res) => {
  try {
    const branchId = req.user._id;

    const stock = await Stock.find({ branch: branchId }).populate(
      "product",
      "name price"
    );

    res.status(200).json(stock);
  } catch (error) {
    console.error("Error fetching stock", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
