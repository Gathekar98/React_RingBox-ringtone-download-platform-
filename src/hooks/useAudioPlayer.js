import {
  useEffect,
  useRef,
  useState,
} from "react";

export function useAudioPlayer() {
  const audioRef =
    useRef(null);

  if (!audioRef.current) {
    audioRef.current =
      new Audio();
  }

  const [
    currentSound,
    setCurrentSound,
  ] = useState(null);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);

  const [
    duration,
    setDuration,
  ] = useState(0);

  useEffect(() => {
    const audio =
      audioRef.current;

    const handleTimeUpdate =
      () => {
        setCurrentTime(
          audio.currentTime
        );
      };

    const handleMetadata =
      () => {
        setDuration(
          Number.isFinite(
            audio.duration
          )
            ? audio.duration
            : 0
        );
      };

    const handleEnded =
      () => {
        setIsPlaying(false);

        setCurrentTime(0);
      };

    const handlePause =
      () => {
        setIsPlaying(false);
      };

    const handlePlay =
      () => {
        setIsPlaying(true);
      };

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "loadedmetadata",
      handleMetadata
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    audio.addEventListener(
      "pause",
      handlePause
    );

    audio.addEventListener(
      "play",
      handlePlay
    );

    return () => {
      audio.pause();

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleMetadata
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );

      audio.removeEventListener(
        "play",
        handlePlay
      );
    };
  }, []);

  const playSound =
    async (sound) => {
      const audio =
        audioRef.current;

      if (!sound?.preview) {
        return;
      }

      if (
        currentSound?.id ===
        sound.id
      ) {
        if (audio.paused) {
          try {
            await audio.play();
          } catch (error) {
            console.error(
              "Playback failed:",
              error
            );
          }
        } else {
          audio.pause();
        }

        return;
      }

      audio.pause();

      audio.src =
        sound.preview;

      audio.currentTime = 0;

      setCurrentSound(
        sound
      );

      setCurrentTime(0);

      setDuration(
        sound.duration || 0
      );

      try {
        await audio.play();
      } catch (error) {
        console.error(
          "Playback failed:",
          error
        );
      }
    };

  const seek =
    (time) => {
      const audio =
        audioRef.current;

      if (!audio) {
        return;
      }

      const newTime =
        Number(time);

      if (
        !Number.isFinite(
          newTime
        )
      ) {
        return;
      }

      audio.currentTime =
        newTime;

      setCurrentTime(
        newTime
      );
    };

  const stopSound =
    () => {
      const audio =
        audioRef.current;

      audio.pause();

      audio.currentTime = 0;

      setCurrentTime(0);

      setIsPlaying(false);
    };

  return {
    currentSound,

    currentSoundId:
      currentSound?.id ||
      null,

    isPlaying,
    currentTime,
    duration,

    playSound,
    seek,
    stopSound,
  };
}