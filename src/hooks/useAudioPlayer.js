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
    currentSoundId,
    setCurrentSoundId,
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
    };
  }, []);

  const playSound =
    async (sound) => {
      const audio =
        audioRef.current;

      if (!sound.preview) {
        return;
      }

      if (
        currentSoundId ===
        sound.id
      ) {
        if (audio.paused) {
          try {
            await audio.play();

            setIsPlaying(
              true
            );
          } catch (error) {
            console.error(
              "Playback failed:",
              error
            );
          }
        } else {
          audio.pause();

          setIsPlaying(
            false
          );
        }

        return;
      }

      audio.pause();

      audio.src =
        sound.preview;

      audio.currentTime = 0;

      setCurrentSoundId(
        sound.id
      );

      setCurrentTime(0);

      setDuration(
        sound.duration || 0
      );

      try {
        await audio.play();

        setIsPlaying(true);
      } catch (error) {
        console.error(
          "Playback failed:",
          error
        );

        setIsPlaying(false);
      }
    };

  const seek = (time) => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime =
      Number(time);

    setCurrentTime(
      Number(time)
    );
  };

  return {
    currentSoundId,
    isPlaying,
    currentTime,
    duration,
    playSound,
    seek,
  };
}