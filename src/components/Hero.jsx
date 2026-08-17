import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const  handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if(!trimmedQuery) return;

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return(
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__badge">
          <span>●</span>
          Discover your next favorite sound
        </div>
        <h1 className="hero__title">
          sound worth
          <span> hearing.</span>
        </h1>
        <p className="hero__description">
          Explore ringtones, notification sound, ambient audio, nature sound and more.
        </p>
        <form className="hero__search" onSubmit={handleSubmit}>
          <span className="hero__search-icon">⌕</span>
          <input 
            type="search"
            placeholder="Search sounds, categories..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search sounds"
          />
          <button type="submit">
            Search
          </button>

          <div className="hero__trending">
            <span>Trending:</span>
            <button onClick={()=> navigate("/search?q=Rain")}>
              Rain
            </button>
            <button onClick={()=> navigate("/search?q=Retro")}>
              Retro
            </button>
            <button onClick={()=> navigate("/search?q=Notification")}>
              Notification
            </button>
            <button onClick={()=> navigate("/search?q=Nature")}>
              Nature
            </button>
          </div>

          <div className="hero__wave">
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Hero;