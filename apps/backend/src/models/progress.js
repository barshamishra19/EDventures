
// models/Progress.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedModules: [
      {
        moduleName: String,
        score: Number,
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalScore: {
      type: Number,
      default: 0,
    },
    badgesEarned: [String],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
