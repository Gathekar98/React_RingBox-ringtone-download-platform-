import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getSoundById,
  searchSounds,
} from "../api/freesound";

import {
  normalizeSound,
} from "../utils/normalizeSound";

import {
  useAudioPlayer,
} from "../hooks/useAudioPlayer";

import SoundGrid
  from "../components/SoundGrid";

import "./SoundDetails.css";
import FavoriteButton
  from "../components/FavoriteButton";

import {
  useFavorites,
} from "../hooks/useFavorites";  

function SoundDetails() {
  const { id } = useParams();

  const [
    sound,
    setSound,
  ] = useState(null);

  const [
    relatedSounds,
    setRelatedSounds,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const audioPlayer =
    useAudioPlayer();
   
    const favorites =
    useFavorites();

  useEffect(() => {
    async function loadSound() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getSoundById(id);

        const normalized =
          normalizeSound(data);

        setSound(normalized);

        /*
         * Related sounds:
         * use the first few tags as
         * a search query.
         */
        if (
          normalized.tags.length > 0
        ) {
          const relatedQuery =
            normalized.tags
              .slice(0, 3)
              .join(" ");

          const relatedData =
            await searchSounds(
              relatedQuery,
              1,
              8
            );

          const related =
            relatedData.results
              .map(normalizeSound)
              .filter(
                (item) =>
                  item.id !==
                  normalized.id
              )
              .slice(0, 8);

          setRelatedSounds(
            related
          );
        }
      } catch (error) {
        console.error(
          "Unable to load sound:",
          error
        );

        setError(
          "We couldn't load this sound."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSound();
  }, [id]);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <p>
            Loading sound...
          </p>
        </div>
      </section>
    );
  }

  if (error || !sound) {
    return (
      <section className="section">
        <div className="container">

          <p className="error-message">
            {error ||
              "Sound not found."}
          </p>

          <Link
            to="/ringtones"
            className="sound-details__back"
          >
            ← Back to sounds
          </Link>

        </div>
      </section>
    );
  }

  const {
    currentSoundId,
    isPlaying,
    currentTime,
    duration,
    playSound,
    seek,
  } = audioPlayer;

  const isActive =
    currentSoundId === sound.id;

  const playerDuration =
    isActive
      ? duration ||
        sound.duration
      : sound.duration;

  const playerTime =
    isActive
      ? currentTime
      : 0;

  const formatDuration =
    (seconds = 0) => {
      const numericSeconds =
        Number(seconds);

      const safeSeconds =
        Number.isFinite(
          numericSeconds
        )
          ? Math.floor(
              numericSeconds
            )
          : 0;

      const minutes =
        Math.floor(
          safeSeconds / 60
        );

      const remaining =
        safeSeconds % 60;

      return `${minutes}:${remaining
        .toString()
        .padStart(2, "0")}`;
    };

  return (
    <>
      <section className="sound-details">

        <div className="container">

          <Link
            to="/ringtones"
            className="sound-details__back"
          >
            ← Back to sounds
          </Link>

          <div className="sound-details__layout">

            <div className="sound-details__player">

              <div className="sound-details__waveform">

                {sound.waveform ? (
                  <img
                    src={
                      sound.waveform
                    }
                    alt=""
                  />
                ) : (
                  <div className="sound-details__wave-placeholder">
                    ♫
                  </div>
                )}

                <button
                  type="button"
                  className="sound-details__play"
                  onClick={
                    () =>
                      playSound(
                        sound
                      )
                  }
                  disabled={
                    !sound.preview
                  }
                >
                  {isActive &&
                  isPlaying
                    ? "❚❚"
                    : "▶"}
                </button>

              </div>

              <div className="sound-details__progress">

                <input
                  type="range"
                  min="0"
                  max={
                    playerDuration ||
                    0
                  }
                  step="0.01"
                  value={
                    playerTime
                  }
                  onChange={
                    (event) =>
                      seek(
                        Number(
                          event
                            .target
                            .value
                        )
                      )
                  }
                  disabled={
                    !isActive
                  }
                  aria-label="Sound playback position"
                />

                <div className="sound-details__times">

                  <span>
                    {formatDuration(
                      playerTime
                    )}
                  </span>

                  <span>
                    {formatDuration(
                      playerDuration
                    )}
                  </span>

                </div>

              </div>

            </div>

            <div className="sound-details__info">

              <p className="sound-details__eyebrow">
                RingBox Sound
              </p>

              <div className="sound-details__title-row">
                    <h1>
                        {sound.title}
                    </h1>
                    <FavoriteButton
                        sound={sound}
                        favorites={favorites}
                    />
                </div>
                
              <p className="sound-details__creator">
                Uploaded by{" "}
                <strong>
                  {sound.creator}
                </strong>
              </p>

              <div className="sound-details__stats">

                <div>
                  <span>
                    Duration
                  </span>

                  <strong>
                    {formatDuration(
                      sound.duration
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Downloads
                  </span>

                  <strong>
                    {sound.downloads
                      .toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>
                    Rating
                  </span>

                  <strong>
                    {sound.rating
                      .toFixed(1)}
                  </strong>
                </div>

              </div>

              <div className="sound-details__license">

                <span>
                  License
                </span>

                <strong>
                  {sound.license}
                </strong>

              </div>

              {sound.freesoundUrl && (
                <a
                  href={
                    sound.freesoundUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="sound-details__source"
                >
                  View original on
                  Freesound ↗
                </a>
              )}

            </div>

          </div>

          {sound.description && (
            <section className="sound-details__section">

              <h2>
                About this sound
              </h2>

              <p>
                {sound.description}
              </p>

            </section>
          )}

          {sound.tags.length >
            0 && (
            <section className="sound-details__section">

              <h2>
                Tags
              </h2>

              <div className="sound-details__tags">

                {sound.tags.map(
                  (tag) => (
                    <Link
                      key={tag}
                      to={`/search?q=${encodeURIComponent(
                        tag
                      )}`}
                    >
                      {tag}
                    </Link>
                  )
                )}

              </div>

            </section>
          )}

        </div>

      </section>

      {relatedSounds.length >
        0 && (
        <section className="section">

          <div className="container">

            <h2 className="section-title">
              Related Sounds
            </h2>

            <p className="section-description">
              More sounds you
              might like.
            </p>

            <div
              style={{
                marginTop:
                  "32px",
              }}
            >
              <SoundGrid
                sounds={
                  relatedSounds
                }
                audioPlayer={
                  audioPlayer
                }
              />
            </div>

          </div>

        </section>
      )}
    </>
  );
}

export default SoundDetails;