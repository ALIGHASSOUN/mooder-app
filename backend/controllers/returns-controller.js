import { Return } from "../models/return-model.js";
import { Product } from "../models/product-model.js";

export const createReturn = async (req, res) => {
  try {
    const { productId, quantityReturned, reason } = req.body;
    const branchId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const returnDoc = new Return({
      product: productId,
      branch: branchId,
      quantityReturned,
      reason,
    });

    await returnDoc.save();

    product.quantity += quantityReturned;
    await product.save();

    res.status(201).json({ message: "Return recorded", return: returnDoc });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to record return", error: error.message });
  }
};

export const getReturns = async (req, res) => {
  try {
    const returns = await Return.find().populate(
      "product branch",
      "name username branchName"
    );
    res.status(200).json(returns);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch returns", error: error.message });
  }
};

export const getBranchReturns = async (req, res) => {
  try {
    const branchId = req.user._id;
    const returns = await Return.find({ branch: branchId }).populate(
      "product",
      "name price"
    );
    res.status(200).json(returns);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch branch returns",
      error: error.message,
    });
  }
};
