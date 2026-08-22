import {
  createContext,
  useContext,
} from "react";

export const AudioPlayerContext =
  createContext(null);

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