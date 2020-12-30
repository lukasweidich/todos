import mongoose from "mongoose";

const schemaName = "Todo";

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models[schemaName] ||
  mongoose.model(schemaName, todoSchema);
