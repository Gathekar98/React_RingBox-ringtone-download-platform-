import { Link } from "react-router-dom";

import SoundGrid
  from "../components/SoundGrid";

import {
  useAudioPlayer,
} from "../hooks/useAudioPlayer";

import {
  useFavorites,
} from "../hooks/useFavorites";

function Favorites() {
  const audioPlayer =
    useAudioPlayer();

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
              <p className="empty-message">
                You haven't saved
                any sounds yet.
              </p>

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