import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    walletAddress: { type: String, unique: true, sparse: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
