import React, { useState, useEffect } from "react";

interface Props {
  stemVal: string; // this can be typed to our specific Stem model
  active: boolean;
  paused: boolean;
}

const StemItem: React.FC<Props> = ({ stemVal, active, paused }) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = React.useRef(0);
  const elapsedTimeRef = React.useRef(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (active && !paused) {
      startTimeRef.current = Date.now() - elapsedTimeRef.current;
      interval = setInterval(() => {
        const timeDiff = Date.now() - startTimeRef.current;
        const newProgress = Math.min((timeDiff / 15_000) * 100, 100);
        setProgress(newProgress);
      }, 100);
    } else if (active && paused) {
      elapsedTimeRef.current = Date.now() - startTimeRef.current;
    } else if (!active) {
      setProgress(0);
      elapsedTimeRef.current = 0;
      startTimeRef.current = 0;
    }

    return () => clearInterval(interval);
  }, [active, paused]);

  return (
    <div
      className="relative h-8 rounded-lg text-gray-700 bg-gray-200 overflow-hidden"
      style={{ width: "500px" }}
    >
      <div className="flex items-center justify-center relative z-10">
        {stemVal}
      </div>
      {active && (
        <div
          className="loading-bar absolute top-0 left-0"
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "blue",
          }}
        ></div>
      )}
    </div>
  );
};

export default StemItem;
