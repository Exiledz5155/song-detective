"use client";

import React, { FormEvent } from "react";
import data from "../test_data/songs.json";
import {
  useSongOfTheDay,
  useUserGuess,
} from "../providers/SongProvider/songContext";

const AutoCompleteSearch = () => {
  const { setUserGuess } = useUserGuess();
  const UiSongDBSongMap = new Map<string, string>();
  const songList: string[] = data.data.songs.map((song) => {
    const uiSongId = `${song.artist} - ${song.title}`;
    UiSongDBSongMap.set(uiSongId, song.uuid);
    return uiSongId;
  });

  const [userInput, setUserInput] = React.useState("");
  const [filteredSongs, setFilteredSongs] = React.useState<Array<string>>([]);
  const [showSongList, setShowSongList] = React.useState(false);
  const [activeSong, setActiveSong] = React.useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeSong) {
      return;
    }
    const currUserInput = e.currentTarget.value;
    const filteredSongs = songList.filter(
      (song) => song.toLowerCase().indexOf(currUserInput.toLowerCase()) > -1
    );

    setUserInput(currUserInput);
    setShowSongList(true);
    setFilteredSongs(filteredSongs);
    setActiveSong(0);
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setUserInput(e.currentTarget.innerText);
    setShowSongList(false);
    setFilteredSongs([]);
    setActiveSong(0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setUserInput(filteredSongs[activeSong]);
      setShowSongList(false);
      setActiveSong(0);
    } else if (e.code === "ArrowUp") {
      if (activeSong === 0) {
        return;
      }

      setActiveSong((prev) => prev - 1);
    } else if (e.code === "ArrowDown") {
      if (activeSong - 1 === filteredSongs.length) {
        return;
      }

      setActiveSong((prev) => prev + 1);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!songList.includes(userInput)) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const guess = formData.get("guess") as string;
    if (UiSongDBSongMap.has(guess)) {
      const guessUUID = UiSongDBSongMap.get(guess);
      setUserGuess(guessUUID as string);
    } else {
      console.error("idk yet");
    }
  };

  let songListComponent;

  if (showSongList && userInput) {
    if (filteredSongs.length) {
      songListComponent = (
        <ul className="song-list">
          {filteredSongs.map((song, idx) => {
            let className;

            if (idx === activeSong) {
              className = "song-active";
            }

            return (
              <li className={className} key={song} onClick={onClick}>
                {song}
              </li>
            );
          })}
        </ul>
      );
    } else {
      songListComponent = (
        <div className="no-song">
          <em>May not be a song, or song doesn't exist</em>
        </div>
      );
    }
  }

  return (
    <div className="flex justify-center mb-4">
      <form onSubmit={onSubmit} className="flex items-center">
        <div className="relative">
          <input
            type="text"
            name="guess"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            className="autocomplete"
            autoComplete="off"
            placeholder="Who’s the artist or what's the title?"
          />
          {showSongList && userInput && (
            <div className="absolute top-full left-0 w-full mt-1 ">
              {songListComponent}
            </div>
          )}
        </div>
        <button
          className="bg-transparent text-green-200 border-2 border-green-300 px-4 py-2 rounded ml-2 flex items-center"
          style={{ height: "40px" }}
          type="submit"
        >
          GUESS
        </button>
      </form>
    </div>
  );
};

export default AutoCompleteSearch;
