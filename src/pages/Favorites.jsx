import { Link } from "react-router-dom";

import SoundGrid
  from "../components/SoundGrid";

import EmptyState
  from "../components/EmptyState";

import {
  useGlobalAudioPlayer,
} from "../context/AudioPlayerContext";

import {
  useFavorites,
} from "../hooks/useFavorites";

function Favorites() {
  const audioPlayer =
  useGlobalAudioPlayer();

  const favorites =
    useFavorites();

  return (
    <section className="section">

      <div className="container">

        <h1 className="section-title">
          Favorites
        </h1>

        <p className="section-description">
          Sounds you've saved for
          later.
        </p>

        <div
          style={{
            marginTop: "36px",
          }}
        >
          {favorites.favorites.length ===
          0 ? (
            <div>
              <EmptyState
                icon="♡"
                title="No favorites yet"
                description="Save sounds you like and they'll appear here."
                actionLabel="Explore Sounds"
                actionTo="/ringtones"
              />

              <div
                style={{
                  marginTop:
                    "18px",
                }}
              >
                <Link
                  to="/ringtones"
                  className="navbar__cta"
                >
                  Explore Sounds
                </Link>
              </div>
            </div>
          ) : (
            <SoundGrid
              sounds={
                favorites.favorites
              }
              audioPlayer={
                audioPlayer
              }
              favorites={
                favorites
              }
            />
          )}
        </div>

      </div>

    </section>
  );
}

export default Favorites;