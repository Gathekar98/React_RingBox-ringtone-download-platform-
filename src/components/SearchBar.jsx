import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./SearchBar.css";

function SearchBar({
  initialValue = "",
}) {
  const [query, setQuery] =
    useState(initialValue);

  const navigate =
    useNavigate();

  const handleSubmit =
    (event) => {
      event.preventDefault();

      const trimmedQuery =
        query.trim();

      if (!trimmedQuery) {
        return;
      }

      navigate(
        `/search?q=${encodeURIComponent(
          trimmedQuery
        )}&page=1`
      );
    };

  return (
    <form
      className="search-bar"
      onSubmit={
        handleSubmit
      }
    >
      <span className="search-bar__icon">
        ⌕
      </span>

      <input
        type="search"
        placeholder="Search ringtones and sounds..."
        value={query}
        onChange={
          (event) =>
            setQuery(
              event.target.value
            )
        }
        aria-label="Search sounds"
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;