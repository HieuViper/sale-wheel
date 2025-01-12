"use client";

import { getRotationDegrees } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { RotationContainer } from "./RotationContainer";

const STARTED_SPINNING = "started-spinning";
const START_SPINNING_TIME = 800;
const CONTINUE_SPINNING_TIME = 400;
const STOP_SPINNING_TIME = 4000;

export default function Wheel({
  mustStartSpinning,
  prizeNumber,
  onClick = () => null,
  onStopSpinning = () => null,
}) {
  const [startrotationdegrees, setstartrotationdegrees] = useState(0);
  const [finalrotationdegrees, setfinalrotationdegrees] = useState(0);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
  const mustStopSpinning = useRef(false);

  const startSpinning = () => {
    setHasStartedSpinning(true);
    setHasStoppedSpinning(false);
    mustStopSpinning.current = true;
    setTimeout(() => {
      if (mustStopSpinning.current) {
        mustStopSpinning.current = false;
        setHasStartedSpinning(false);
        setHasStoppedSpinning(true);
        onStopSpinning();
      }
    }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300);
  };

  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning) {
      setIsCurrentlySpinning(true);
      startSpinning();
      const finalrotationdegreesCalculated = getRotationDegrees(
        prizeNumber,
        12
      );
      setfinalrotationdegrees(finalrotationdegreesCalculated);
    }
  }, [mustStartSpinning]);

  useEffect(() => {
    if (hasStoppedSpinning) {
      setIsCurrentlySpinning(false);
      setstartrotationdegrees(finalrotationdegrees);
    }
  }, [hasStoppedSpinning]);

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING;
    }
    return "";
  };

  return (
    <>
      <RotationContainer
        className={getRouletteClass()}
        startspinningtime={START_SPINNING_TIME}
        continuespinningtime={CONTINUE_SPINNING_TIME}
        stopspinningtime={STOP_SPINNING_TIME}
        startrotationdegrees={startrotationdegrees}
        finalrotationdegrees={finalrotationdegrees}
      >
        <img
          src="./woay_TN.webp"
          alt="wheel"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            margin: "0 auto",
          }}
        />
      </RotationContainer>
      <img src="./woay_vien.webp" alt="" className="absolute " />
      <img
        src="./tam_woay.webp"
        alt="button"
        onClick={() => onClick()}
        className="cursor-pointer relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px]"
      />
    </>
  );
}
