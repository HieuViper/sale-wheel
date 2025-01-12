"use server";

import dbConnect from "@/dbConnect/dbConnect";
import WheelSegments from "@/models/WheelSegments";
import { revalidatePath } from "next/cache";

export const createWheelSegment = async (formData) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    await dbConnect();
    console.log("🚀 ~ createUser ~ formData:", formData);

    const { label, quantity, order, percentage } = formData;

    if (!label || !quantity || !order || !percentage) {
      return {
        error: "All fields required",
      };
    }

    const existingSegment = await WheelSegments.findOne({ order });
    if (existingSegment) {
      return {
        error: "Order already exists",
      };
    }

    const data = {
      label,
      quantity,
      order,
      percentage,
    };
    const rs = await new WheelSegments(data).save();
    revalidatePath("/dashboard/wheel-segments");
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
};

export const updateWheelSegment = async (id, formData) => {
  try {
    await dbConnect();

    const res = await WheelSegments.findByIdAndUpdate(id, formData);
    revalidatePath("/dashboard/wheel-segments");
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const deleteWheelSegment = async (id) => {
  try {
    await dbConnect();
    await WheelSegments.findByIdAndDelete(id);
    revalidatePath("/dashboard/wheel-segments");
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
};
