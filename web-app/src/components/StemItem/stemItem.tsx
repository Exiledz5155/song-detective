import React, { useState, useEffect } from "react";

interface Props {
  stemVal: string;
  active: boolean;
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const StemItem: React.FC<Props> = ({ stemVal, active, paused, setPaused }) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = React.useRef(0);
  const elapsedTimeRef = React.useRef(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let newProgress: number = 0;
    if (active && !paused) {
      startTimeRef.current = Date.now() - elapsedTimeRef.current;
      interval = setInterval(() => {
        const timeDiff = Date.now() - startTimeRef.current;
        newProgress = Math.min((timeDiff / 15_000) * 100, 100);
        setProgress(newProgress);
      }, 100);
    } else if (active && paused) {
      if (progress === 0) {
        return;
      }
      elapsedTimeRef.current = Date.now() - startTimeRef.current;
    } else if (!active) {
      setProgress(0);
      elapsedTimeRef.current = 0;
      startTimeRef.current = 0;
    }

    return () => clearInterval(interval);
  }, [active, paused]);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setPaused(true);
      elapsedTimeRef.current = 0;
      startTimeRef.current = 0;
    }
  }, [progress]);

  return (
    <div>
      <div className="relative h-2 rounded-lg text-gray-700 bg-gray-200 overflow-hidden">
        {active && (
          <div
            className="loading-bar absolute top-0 left-0"
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "blue",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StemItem;
