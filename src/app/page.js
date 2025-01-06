"use client";
import Wheel from "@/components/Wheel";
import { getRandomInt } from "@/utils/utils";
import { useState } from "react";

export default function Home() {
  const [couponNum, setCouponNum] = useState(1);
  const [mustSpin, setMustSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mockData = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
  };

  const onClick = () => {
    if (!spinning) {
      setSpinning(true);
      const newCouponNum = getRandomInt(1, 12);
      setCouponNum(newCouponNum);
      console.log(newCouponNum);
      setMustSpin(true);
    }
  };
  return (
    <div className="">
      <div className="App">
        <div className="w-[100%] h-[100vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={couponNum}
            onClick={() => onClick()}
            onStopSpinning={() => {
              setSpinning(false);
              setMustSpin(false);
              handleOpen();
            }}
          />
        </div>

        <div className="text-2xl">{mockData[couponNum]}</div>
      </div>
    </div>
  );
}
