import dbConnect from "@/dbConnect/dbConnect";
import WheelSegments from "@/models/WheelSegments";

export const getWheelSegments = async () => {
  try {
    await dbConnect();

    const items = await WheelSegments.find({}).sort({ order: 1 });
    const itemCount = await WheelSegments.countDocuments({});

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

export const getWheelSegmentsByID = async (id) => {
  try {
    await dbConnect();

    const item = await WheelSegments.findOne({ _id: id });

    return {
      success: true,
      item,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
};
