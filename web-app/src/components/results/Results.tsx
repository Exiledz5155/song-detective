"use client";

import React from "react";
import {
  useSongOfTheDay,
  useUserGuess,
} from "../providers/SongProvider/songContext";
import SuccessResult from "./States/SuccessResults";
import WrongGuessResult from "./States/WrongGuessResults";

const Results: React.FC = () => {
  const { userGuess } = useUserGuess();
  const [resultState, setResultState] = React.useState<
    "correct" | "wrong" | undefined
  >();
  const { songOfTheDay } = useSongOfTheDay();

  React.useEffect(() => {
    if (userGuess) {
      if (userGuess === songOfTheDay) {
        setResultState("correct");
      } else {
        setResultState("wrong");
      }
    }
  }, [userGuess]);

  if (!resultState) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      {resultState === "correct" ? <SuccessResult /> : <WrongGuessResult />}
    </div>
  );
};

export default Results;
