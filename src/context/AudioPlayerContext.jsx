import {
  createContext,
  useContext,
} from "react";

import {
  useAudioPlayer,
} from "../hooks/useAudioPlayer";

import {
  useRecentlyPlayed,
} from "../hooks/useRecentlyPlayed";

const AudioPlayerContext =
  createContext(null);

export function AudioPlayerProvider({
  children,
}) {
  const audioPlayer =
    useAudioPlayer();

  const recentlyPlayed =
    useRecentlyPlayed();

  const handlePlaySound =
    async (sound) => {
      await audioPlayer.playSound(
        sound
      );

      recentlyPlayed.addRecentlyPlayed(
        sound
      );
    };

  const value = {
    ...audioPlayer,

    playSound:
      handlePlaySound,

    recentlyPlayed:
      recentlyPlayed.recentlyPlayed,

    clearRecentlyPlayed:
      recentlyPlayed.clearRecentlyPlayed,
  };

  return (
    <AudioPlayerContext.Provider
      value={value}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useGlobalAudioPlayer() {
  const context =
    useContext(
      AudioPlayerContext
    );

  if (!context) {
    throw new Error(
      "useGlobalAudioPlayer must be used inside AudioPlayerProvider"
    );
  }

  return context;
}