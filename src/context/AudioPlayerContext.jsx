import {
  useAudioPlayer,
} from "../hooks/useAudioPlayer";

import {
  useRecentlyPlayed,
} from "../hooks/useRecentlyPlayed";

import {
  AudioPlayerContext,
} from "./audioPlayerContext";

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