import {
  useEffect,
  useState,
} from "react";

import Hero
  from "../components/Hero";

import SoundSkeleton
  from "../components/SoundSkeleton";
  
import SoundGrid
  from "../components/SoundGrid";

import CategoryCard
  from "../components/CategoryCard";

import "../components/CategoryGrid.css";

import {
  searchSounds,
} from "../api/freesound";

import {
  normalizeSound,
} from "../utils/normalizeSound";

import {
  useFavorites,
} from "../hooks/useFavorites";

import {
  useGlobalAudioPlayer,
} from "../context/audioPlayerContext";

import {
  categories,
} from "../data/categories";

function Home() {
  const [
    sounds,
    setSounds,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");
  
  
  const favorites = useFavorites();
  const audioPlayer =
  useGlobalAudioPlayer();
  
  const recentlyPlayed =
  audioPlayer.recentlyPlayed;

  useEffect(() => {
    async function loadSounds() {
      try {
        setLoading(true);

        setError("");

        const data =
          await searchSounds(
            "notification",
            1,
            12
          );

        setSounds(
          data.results.map(
            normalizeSound
          )
        );
      } catch (error) {
        console.error(
          error
        );

        setError(
          "We couldn't load sounds right now."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSounds();
  }, []);

  return (
    <>
      <title>
        RingBox — Discover Ringtones & Sounds
      </title>

      <meta
        name="description"
        content="Discover, preview and save ringtones, notification sounds, nature audio, retro sounds and more with RingBox."
      />
      <Hero />

      <section className="section">

        <div className="container">

          <h2 className="section-title">
            Explore Categories
          </h2>

          <p className="section-description">
            Find the right sound
            for every mood or
            notification.
          </p>

          <div
            className="categories-grid"
            style={{
              marginTop:
                "32px",
            }}
          >
            {categories
              .slice(0, 6)
              .map(
                (category) => (
                  <CategoryCard
                    key={
                      category.id
                    }
                    category={
                      category
                    }
                  />
                )
              )}
          </div>

        </div>

      </section>

      {recentlyPlayed.length > 0 && (
        <section className="section">

          <div className="container">

            <div className="recent-header">

              <div>

                <h2 className="section-title">
                  Recently Played
                </h2>

                <p className="section-description">
                  Pick up where you
                  left off.
                </p>

              </div>

              <button
                type="button"
                className="recent-clear"
                onClick={
                  audioPlayer
                    .clearRecentlyPlayed
                }
              >
                Clear
              </button>

            </div>

            <div
              style={{
                marginTop:
                  "32px",
              }}
            >
              <SoundGrid
                sounds={
                  recentlyPlayed
                }
                audioPlayer={
                  audioPlayer
                }
                favorites={
                  favorites
                }
              />
            </div>

          </div>

        </section>
      )}

      <section className="section">

        <div className="container">

          <h2 className="section-title">
            Trending Sounds
          </h2>

          <p className="section-description">
            Discover short sounds
            from the RingBox
            collection.
          </p>

          <div
            style={{
              marginTop:
                "32px",
            }}
          >

            {loading && (
               <SoundSkeleton
                  count={8}
                />
            )}

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            {!loading &&
              !error &&
              sounds.length >
                0 && (
                <SoundGrid
                  sounds={sounds}
                  audioPlayer={audioPlayer}
                  favorites={favorites}
                />
              )}

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;