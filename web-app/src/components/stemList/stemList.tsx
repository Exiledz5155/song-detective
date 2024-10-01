"use client";

import { Stem } from "@/lib/definitions";
import React from "react";
import StemItem from "../StemItem";
import {
  LightBulbIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/16/solid";
import AutoCompleteSearch from "../autocompleteSearch/AutoCompleteSearch";
import {
  useSongOfTheDay,
  useSongStems,
} from "../providers/SongProvider/songContext";

const StemList: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const { stems } = useSongStems();

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (activeIndex === -1) {
      setActiveIndex(0);
    }
  };

  if (!stems) {
    return null;
  }

  const handleSkip = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % stems.length);
    setIsPlaying(true);
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-2 mb-6">
        <LightBulbIcon className="h-4 text-yellow-300" />
        <div className="text-gray-300 text-xs">
          Click on a stem to play it. Click on the play button to start the
          playback. Click on the skip button to skip to the next stem.
        </div>
      </div>
      {stems.map((stem, index) => (
        <div key={stem.stemId} className="mb-8">
          <div>
            <div className="flex justify-start gap-2">
              {stem.name}
              {index === activeIndex && isPlaying && (
                <div className="flex flex-col justify-center">
                  <SpeakerWaveIcon className="h-3 text-gray-200 align-middle" />
                </div>
              )}
            </div>
          </div>
          <div>
            <StemItem
              stemVal={stem.name}
              active={index === activeIndex}
              paused={!isPlaying}
              setPaused={() => setIsPlaying(!isPlaying)}
            />
          </div>
        </div>
      ))}
      <div>
        <div className="flex justify-center mb-4">
          <button
            onClick={handlePlay}
            className="bg-transparent text-gray-300 border-2 border-gray-400 px-4 py-2 rounded flex items-center"
          >
            {!isPlaying ? (
              <PlayIcon className="h-5" />
            ) : (
              <PauseIcon className="h-5" />
            )}
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className="bg-transparent text-yellow-300 border-2 border-yellow-400 px-4 py-2 rounded mr-2 flex items-center"
            style={{ height: "40px" }}
            onClick={handleSkip}
          >
            SKIP
          </button>
          <AutoCompleteSearch />
        </div>
      </div>
    </div>
  );
};

export default StemList;
