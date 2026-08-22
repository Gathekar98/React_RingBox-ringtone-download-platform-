import {
  useEffect,
  useState,
} from "react";

const STORAGE_KEY =
  "ringbox-recently-played";

const MAX_RECENT = 12;

export function useRecentlyPlayed() {
  const [
    recentlyPlayed,
    setRecentlyPlayed,
  ] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      return saved
        ? JSON.parse(saved)
        : [];
    } catch (error) {
      console.error(
        "Unable to read recently played:",
        error
      );

      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          recentlyPlayed
        )
      );
    } catch (error) {
      console.error(
        "Unable to save recently played:",
        error
      );
    }
  }, [recentlyPlayed]);

  const addRecentlyPlayed =
    (sound) => {
      if (!sound?.id) {
        return;
      }

      setRecentlyPlayed(
        (current) => {
          const filtered =
            current.filter(
              (item) =>
                item.id !==
                sound.id
            );

          return [
            sound,
            ...filtered,
          ].slice(
            0,
            MAX_RECENT
          );
        }
      );
    };

  const clearRecentlyPlayed =
    () => {
      setRecentlyPlayed([]);
    };

  return {
    recentlyPlayed,
    addRecentlyPlayed,
    clearRecentlyPlayed,
  };
}