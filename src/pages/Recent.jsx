import SoundGrid
  from "../components/SoundGrid";

import {
  useGlobalAudioPlayer,
} from "../context/audioPlayerContext";

import EmptyState
  from "../components/EmptyState";

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
    <>
        <title>
            Recently Played | RingBox
        </title>

        <meta
        name="description"
        content="Return to sounds you recently played on RingBox."
        />
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
                <EmptyState
                    icon="↺"
                    title="Nothing played yet"
                    description="Play a sound and it will appear in your recently played list."
                    actionLabel="Explore Sounds"
                    actionTo="/ringtones"
                    />
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
    </>
    );
}

export default Recent;