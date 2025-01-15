"use client";
import { clearSpinRecord } from "@/actions/spinRecordAction";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ButtonClearData() {
  const [loading, setLoading] = useState(false);
  const handleClear = async () => {
    setLoading(true);
    const res = await clearSpinRecord();
    setLoading(false);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Clear data successfully");
    }
  };

  return (
    <Button
      className="ml-3"
      variant="destructive"
      onClick={() => handleClear()}
      disabled={loading}
    >
      {loading ? "Loading..." : "Clear data"}
    </Button>
  );
}
