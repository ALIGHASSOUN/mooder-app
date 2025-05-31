import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "branch"],
      required: true,
    },
    branchName: {
      type: String,
      required: function () {
        return this.role === "branch";
      },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
