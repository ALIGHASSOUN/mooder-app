import { Sale } from "../models/sales-model.js";
import { Product } from "../models/product-model.js";

export const createSale = async (req, res) => {
  try {
    const { productId, quantitySold } = req.body;
    const branchId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.quantity < quantitySold) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const totalPrice = quantitySold * product.price;

    const sale = new Sale({
      product: productId,
      branch: branchId,
      quantitySold,
      totalPrice,
    });

    await sale.save();

    product.quantity -= quantitySold;
    await product.save();

    res.status(201).json({ message: "Sale recorded", sale });
  } catch (error) {
    console.error("createSale error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to record sale", error: error.message });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate(
      "product branch",
      "name username branchName"
    );
    res.status(200).json(sales);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch sales", error: error.message });
  }
};

export const getBranchSales = async (req, res) => {
  try {
    const branchId = req.user._id;
    const sales = await Sale.find({ branch: branchId }).populate(
      "product",
      "name price"
    );
    res.status(200).json(sales);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch branch sales", error: error.message });
  }
};
