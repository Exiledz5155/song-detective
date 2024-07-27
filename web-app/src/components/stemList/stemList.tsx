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
      <div>
        <div className="mb-6 flex justify-center align-middle">
          <LightBulbIcon className="h-6 md:ml-4 text-gray-400 mr-2" />
          <h1 className="text-gray-400 font-bold text-m md:text-m">
            GUESS THE SONG
          </h1>
        </div>
        {stems.map((stem, index) => (
          <div key={stem.stemId} className="mb-8">
            <div>
              <div className="flex justify-start gap-4">
                {stem.name}
                <div>
                  {index === activeIndex && isPlaying && (
                    <div>
                      <SpeakerWaveIcon className="h-4 text-gray-200" />
                    </div>
                  )}
                </div>
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
              className="bg-green-400 text-white px-4 py-2 rounded"
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
              onClick={handleSkip}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              style={{ height: "40px" }}
            >
              Skip
            </button>
            <AutoCompleteSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StemList;
