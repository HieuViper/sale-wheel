"use server";

import dbConnect from "@/dbConnect/dbConnect";
import SpinRecord from "@/models/SpinRecords";
import WheelSegments from "@/models/WheelSegments";
import { revalidatePath } from "next/cache";

export const spinWheel = async (userData) => {
  try {
    await dbConnect();

    const existingBillCode = await SpinRecord.findOne({
      billCode: userData.bill_code,
    });
    if (existingBillCode) {
      return {
        error: "Mã hóa đơn này đã được sử dụng!",
      };
    }

    const segments = await WheelSegments.find({ quantity: { $gt: 0 } });

    if (segments.length === 0) {
      console.log("Không còn phần thưởng khả dụng!");
      return {
        error: "Không còn phần thưởng khả dụng!",
      };
    }

    const totalPercentage = segments.reduce(
      (sum, segment) => sum + segment.percentage,
      0
    );

    if (totalPercentage === 0) {
      console.log("Không có xác suất trúng thưởng!");
      return {
        error: "Không có xác suất trúng thưởng!",
      };
    }

    const random = Math.random() * totalPercentage;

    let cumulativePercentage = 0;

    for (const segment of segments) {
      cumulativePercentage += segment.percentage;
      if (random <= cumulativePercentage) {
        await WheelSegments.updateOne(
          { _id: segment._id },
          { $inc: { quantity: -1 } }
        );

        const spinRecord = new SpinRecord({
          customerName: userData.name,
          phone: userData.phone,
          totalBill: userData.total_bill,
          branch: userData.store_branch,
          prize: segment._id,
          billCode: userData.bill_code,
          email: userData.email,
        });

        await spinRecord.save();

        return { id: segment.order, label: segment.label };
      }
    }

    return null;
  } catch (error) {
    console.error("Lỗi khi quay vòng quay:", error);
    return {
      error: "Something went wrong",
    };
  }
};

export const clearSpinRecord = async () => {
  try {
    await dbConnect();
    await SpinRecord.deleteMany({});
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
    return {
      error: "Something went wrong",
    };
  }
};
