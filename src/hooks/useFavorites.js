import { useEffect, useState } from "react";

const STORAGE_KEY = "ringbox-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error(
        "Unable to read favorites:",
        error
      );

      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error(
        "Unable to save favorites:",
        error
      );
    }
  }, [favorites]);

  const isFavorite = (soundId) => {
    return favorites.some(
      (sound) => sound.id === soundId
    );
  };

  const addFavorite = (sound) => {
    setFavorites((current) => {
      if (
        current.some(
          (item) => item.id === sound.id
        )
      ) {
        return current;
      }

      return [...current, sound];
    });
  };

  const removeFavorite = (soundId) => {
    setFavorites((current) =>
      current.filter(
        (sound) => sound.id !== soundId
      )
    );
  };

  const toggleFavorite = (sound) => {
    if (isFavorite(sound.id)) {
      removeFavorite(sound.id);
    } else {
      addFavorite(sound);
    }
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}