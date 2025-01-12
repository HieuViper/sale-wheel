"use server";

import SpinRecord from "@/models/SpinRecords";
import WheelSegments from "@/models/WheelSegments";

export const spinWheel = async (userData) => {
  try {
    const segments = await WheelSegments.find({ quantity: { $gt: 0 } });

    if (segments.length === 0) {
      console.log("Không còn phần thưởng khả dụng!");
      return null;
    }

    const totalPercentage = segments.reduce(
      (sum, segment) => sum + segment.percentage,
      0
    );

    if (totalPercentage === 0) {
      console.log("Không có xác suất trúng thưởng!");
      return null;
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
        });

        await spinRecord.save();

        return { id: segment.order, label: segment.label };
      }
    }

    return null;
  } catch (error) {
    console.error("Lỗi khi quay vòng quay:", error);
    return null;
  }
};
