"use client";

import { Stem } from "@/lib/definitions";
import React from "react";
import StemItem from "../StemItem";
import {
  LightBulbIcon,
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/16/solid";

interface StemListProps {
  stems: Stem[];
}

interface StemListProps {
  stems: Stem[];
}

const StemList: React.FC<StemListProps> = ({ stems }) => {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (activeIndex === -1) {
      setActiveIndex(0);
    }
  };

  const handleSkip = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % stems.length);
    setIsPlaying(true);
  };

  return (
    <>
      <div className="mb-6 flex justify-center align-middle">
        <LightBulbIcon className="h-6 md:ml-4 text-gray-400 mr-2" />
        <h1 className="text-gray-400 font-bold text-m md:text-m">
          GUESS THE SONG
        </h1>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handlePlay}
          className="bg-green-400 text-white px-4 py-2 rounded mr-2"
        >
          {!isPlaying ? (
            <PlayIcon className="h-5" />
          ) : (
            <PauseIcon className="h-5" />
          )}
        </button>
        <button
          onClick={handleSkip}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Skip
        </button>
      </div>
      {stems.map((stem, index) => (
        <div key={stem.id} className="mb-4">
          <div className="flex justify-center">
            <div className="mr-2">
              {index === activeIndex && isPlaying && (
                <SpeakerWaveIcon className="h-4 md:ml-4 text-gray-200" />
              )}
            </div>
            <StemItem
              stemVal={stem.name}
              active={index === activeIndex}
              paused={!isPlaying}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default StemList;
