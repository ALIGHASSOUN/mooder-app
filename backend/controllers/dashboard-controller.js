// backend/controllers/dashboard-controller.js
import { Sale } from "../models/Sale.js";
import { Return } from "../models/Return.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";

export const getDailyReport = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // استعلام المبيعات اليومية
    const sales = await Sale.aggregate([
      {
        $match: {
          saleDate: { $gte: today, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: { branch: "$branch", product: "$product" },
          totalSold: { $sum: "$quantitySold" },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    // استعلام المرتجعات اليومية
    const returns = await Return.aggregate([
      {
        $match: {
          returnDate: { $gte: today, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: { branch: "$branch", product: "$product" },
          totalReturned: { $sum: "$quantityReturned" },
        },
      },
    ]);

    // دمج النتائج في خريطة للمعالجة
    const report = {};

    for (const sale of sales) {
      const key = `${sale._id.branch}_${sale._id.product}`;
      report[key] = {
        branch: sale._id.branch,
        product: sale._id.product,
        totalSold: sale.totalSold,
        totalRevenue: sale.totalRevenue,
        totalReturned: 0,
      };
    }

    for (const ret of returns) {
      const key = `${ret._id.branch}_${ret._id.product}`;
      if (report[key]) {
        report[key].totalReturned = ret.totalReturned;
      } else {
        report[key] = {
          branch: ret._id.branch,
          product: ret._id.product,
          totalSold: 0,
          totalRevenue: 0,
          totalReturned: ret.totalReturned,
        };
      }
    }

    // استعلام المنتج والفرع لعرض الأسماء//
    const final = await Promise.all(
      Object.values(report).map(async (entry) => {
        const product = await Product.findById(entry.product);
        const branch = await User.findById(entry.branch);

        return {
          branchName: branch.branchName || branch.username,
          productName: product.name,
          sentQuantity: product.quantity, // المخزون الإجمالي عند الإدارة
          sold: entry.totalSold,
          returned: entry.totalReturned,
          remaining: product.quantity - entry.totalSold + entry.totalReturned,
          totalRevenue: entry.totalRevenue,
        };
      })
    );

    res.status(200).json(final);
  } catch (err) {
    console.error("Dashboard error:", err);
    res
      .status(500)
      .json({ message: "Failed to generate report", error: err.message });
  }
};
