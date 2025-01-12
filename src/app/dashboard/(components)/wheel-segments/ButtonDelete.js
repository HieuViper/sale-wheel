"use client";
import { deleteWheelSegment } from "@/actions/wheelSegmentsAction";
import toast from "react-hot-toast";

export default function ButtonDelete({ id }) {
  const handleDelete = async (id) => {
    console.log(id);
    const res = await deleteWheelSegment(id);
    console.log(res);
    if (res?.error) {
      console.log("🚀 ~ onSubmit ~ error:", res.error);
      toast.error(res.error);
    } else {
      console.log("ok");
      toast.success("Action successfully");
    }
  };

  return (
    <button
      className="w-full flex justify-start"
      onClick={() => handleDelete(id)}
    >
      Delete
    </button>
  );
}
