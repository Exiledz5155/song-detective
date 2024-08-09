"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const SuccessResult: React.FC = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [numberOfPieces, setNumberOfPieces] = useState(200);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5_000);

    const decreaseConfetti = setInterval(() => {
      if (numberOfPieces > 0) {
        setNumberOfPieces((prev) => Math.max(prev - 5, 0));
      } else {
        clearInterval(decreaseConfetti);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(decreaseConfetti);
    };
  }, [numberOfPieces]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={numberOfPieces}
        />
      )}
    </div>
  );
};

export default SuccessResult;
