"use client";

import { Stem } from "@/lib/definitions";
import React from "react";

interface SongInterface {
  songOfTheDay?: string; // some uuid
  stems?: Stem[];
  guessCount: number;
  setGuessCount: (guess: number) => void;
  userGuess?: string;
  setUserGuess: (userGuess: string) => void;
}

export const SongContext = React.createContext<SongInterface>({
  songOfTheDay: undefined,
  stems: undefined,
  guessCount: 0,
  setGuessCount: () => null,
  userGuess: undefined,
  setUserGuess: () => null,
});

/**
 *
 * @returns uuid value tied to the Song object
 */
export const useSongOfTheDay = (): {
  songOfTheDay: string | undefined;
} => {
  const { songOfTheDay } = React.useContext(SongContext);

  return { songOfTheDay };
};

export const useSongStems = (): { stems: Stem[] | undefined } => {
  const { stems } = React.useContext(SongContext);

  return { stems };
};

export const useGuessCount = (): {
  guessCount: number;
  setGuessCount: (guess: number) => void;
} => {
  const { guessCount, setGuessCount } = React.useContext(SongContext);

  return { guessCount, setGuessCount };
};

export const useUserGuess = (): {
  userGuess: string | undefined;
  setUserGuess: (userGuess: string) => void;
} => {
  const { userGuess, setUserGuess } = React.useContext(SongContext);

  return { userGuess, setUserGuess };
};
