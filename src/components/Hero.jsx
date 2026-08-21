import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./Hero.css";

function Hero() {
  const [
    query,
    setQuery,
  ] = useState("");

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

  const searchFor =
    (value) => {
      navigate(
        `/search?q=${encodeURIComponent(
          value
        )}&page=1`
      );
    };

  return (
    <section className="hero">

      <div className="container hero__inner">

        <div className="hero__badge">
          <span>●</span>

          Discover your next
          favorite sound
        </div>

        <h1 className="hero__title">
          Sounds worth
          <span> hearing.</span>
        </h1>

        <p className="hero__description">
          Explore ringtones,
          notification sounds,
          ambient audio, nature
          sounds and more.
        </p>

        <form
          className="hero__search"
          onSubmit={
            handleSubmit
          }
        >
          <span className="hero__search-icon">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search sounds, categories..."
            value={query}
            onChange={
              (event) =>
                setQuery(
                  event.target.value
                )
            }
            aria-label="Search sounds"
          />

          <button
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="hero__trending">

          <span>
            Trending:
          </span>

          <button
            type="button"
            onClick={
              () =>
                searchFor(
                  "rain"
                )
            }
          >
            Rain
          </button>

          <button
            type="button"
            onClick={
              () =>
                searchFor(
                  "retro"
                )
            }
          >
            Retro
          </button>

          <button
            type="button"
            onClick={
              () =>
                searchFor(
                  "notification"
                )
            }
          >
            Notification
          </button>

          <button
            type="button"
            onClick={
              () =>
                searchFor(
                  "nature"
                )
            }
          >
            Nature
          </button>

        </div>

        <div className="hero__wave">
          {Array.from({
            length: 12,
          }).map((_, index) => (
            <span
              key={index}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

export default Hero;