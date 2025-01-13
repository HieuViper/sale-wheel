import mongoose from "mongoose";
import "./WheelSegments";

const SpinRecordSchame = mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    totalBill: { type: Number, required: true, min: 399000 },
    branch: {
      type: String,
      enum: ["aeon_binh_tan", "aeon_tan_phu", "aeon_binh_duong"], // Chi nhánh
      required: true,
    },
    prize: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WheelSegments",
      required: true,
    },
    spinAt: { type: Date, default: Date.now }, // Thời gian quay
  },
  {
    timestamps: true,
  }
);

const SpinRecord =
  mongoose.models.SpinRecord || mongoose.model("SpinRecord", SpinRecordSchame);

export default SpinRecord;
