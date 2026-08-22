import SoundGrid
  from "../components/SoundGrid";

import {
  useGlobalAudioPlayer,
} from "../context/AudioPlayerContext";

import {
  useFavorites,
} from "../hooks/useFavorites";

function Recent() {
  const audioPlayer =
    useGlobalAudioPlayer();

  const favorites =
    useFavorites();

  const {
    recentlyPlayed,
    clearRecentlyPlayed,
  } = audioPlayer;

  return (
    <section className="section">
      <div className="container">

        <div className="recent-header">
          <div>
            <h1 className="section-title">
              Recently Played
            </h1>

            <p className="section-description">
              Sounds you recently listened to.
            </p>
          </div>

          {recentlyPlayed.length > 0 && (
            <button
              type="button"
              className="recent-clear"
              onClick={
                clearRecentlyPlayed
              }
            >
              Clear
            </button>
          )}
        </div>

        <div
          style={{
            marginTop: "32px",
          }}
        >
          {recentlyPlayed.length === 0 ? (
            <p className="empty-message">
              You haven't played any sounds yet.
            </p>
          ) : (
            <SoundGrid
              sounds={recentlyPlayed}
              audioPlayer={audioPlayer}
              favorites={favorites}
            />
          )}
        </div>

      </div>
    </section>
  );
}

export default Recent;