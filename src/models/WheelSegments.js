import mongoose from "mongoose";

const WheelSegmentsSchame = mongoose.Schema(
  {
    label: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    order: { type: Number, required: true, unique: true },
    percentage: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);

const WheelSegments =
  mongoose.models.WheelSegments ||
  mongoose.model("WheelSegments", WheelSegmentsSchame);

export default WheelSegments;
