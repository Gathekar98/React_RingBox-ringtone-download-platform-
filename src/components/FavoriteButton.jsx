import "./FavoriteButton.css";

function FavoriteButton({
  sound,
  favorites,
}) {
  const {
    isFavorite,
    toggleFavorite,
  } = favorites;

  const saved = isFavorite(
    sound.id
  );

  return (
    <button
      type="button"
      className={`favorite-button ${
        saved
          ? "favorite-button--active"
          : ""
      }`}
      onClick={() =>
        toggleFavorite(sound)
      }
      aria-label={
        saved
          ? `Remove ${sound.title} from favorites`
          : `Add ${sound.title} to favorites`
      }
      title={
        saved
          ? "Remove from favorites"
          : "Add to favorites"
      }
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}

export default FavoriteButton;