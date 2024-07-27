"use client";
import React from "react";
import { SongContext } from "./songContext";
import data from "../../test_data/songs.json";
import { SongMetadata } from "@/lib/definitions";

interface Props {
  children: React.ReactNode;
}

const SongProvider: React.FC<Props> = ({ children }) => {
  const rawSongs: SongMetadata[] = data.data.songs;
  const [songOfTheDay] = React.useState(data.data.songOfTheDay);
  const [stems] = React.useState(rawSongs[0].stems);
  const [guessCount, setGuessCount] = React.useState(0);
  const [userGuess, setUserGuess] = React.useState<string>();

  return (
    <SongContext.Provider
      value={{
        songOfTheDay,
        guessCount,
        setGuessCount,
        stems,
        userGuess,
        setUserGuess,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
