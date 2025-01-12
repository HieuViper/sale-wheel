import dbConnect from "@/dbConnect/dbConnect";
import SpinRecord from "@/models/SpinRecords";

export const getSpinRecord = async (
  pageSize,
  pageIndex,
  startDate,
  endDate
) => {
  try {
    await dbConnect();

    console.log(startDate, endDate);

    const query = {};

    if (startDate) {
      const start = new Date(startDate);
      query.spinAt = { ...query.spinAt, $gte: start };
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.spinAt = { ...query.spinAt, $lte: end };
    }

    const items = await SpinRecord.find(query)
      .skip(pageSize * (pageIndex - 1))
      .limit(pageSize)
      .sort({ spinAt: -1 })
      .populate("prize");
    const itemCount = await SpinRecord.countDocuments(query);

    return {
      items,
      itemCount,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
};
