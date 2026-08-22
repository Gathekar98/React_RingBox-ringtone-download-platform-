import {
  Link,
} from "react-router-dom";

import {
  useGlobalAudioPlayer,
} from "../context/AudioPlayerContext";

import "./BottomPlayer.css";

function BottomPlayer() {
  const {
    currentSound,
    isPlaying,
    currentTime,
    duration,
    playSound,
    seek,
    stopSound,
  } =
    useGlobalAudioPlayer();

  if (!currentSound) {
    return null;
  }

  const activeDuration =
    duration ||
    currentSound.duration ||
    0;

  const formatDuration =
    (seconds = 0) => {
      const numeric =
        Number(seconds);

      const safe =
        Number.isFinite(
          numeric
        )
          ? Math.floor(
              numeric
            )
          : 0;

      const minutes =
        Math.floor(
          safe / 60
        );

      const remaining =
        safe % 60;

      return `${minutes}:${remaining
        .toString()
        .padStart(
          2,
          "0"
        )}`;
    };

  return (
    <aside className="bottom-player">

      <div className="container bottom-player__inner">

        <div className="bottom-player__sound">

          <div className="bottom-player__art">

            {currentSound.waveform ? (
              <img
                src={
                  currentSound.waveform
                }
                alt=""
              />
            ) : (
              <span>
                ♫
              </span>
            )}

          </div>

          <div className="bottom-player__details">

            <Link
              to={`/sound/${currentSound.id}`}
            >
              {currentSound.title}
            </Link>

            <span>
              {currentSound.creator}
            </span>

          </div>

        </div>

        <div className="bottom-player__controls">

          <button
            type="button"
            className="bottom-player__play"
            onClick={() =>
              playSound(
                currentSound
              )
            }
            aria-label={
              isPlaying
                ? "Pause sound"
                : "Play sound"
            }
          >
            {isPlaying
              ? "❚❚"
              : "▶"}
          </button>

          <div className="bottom-player__timeline">

            <span>
              {formatDuration(
                currentTime
              )}
            </span>

            <input
              type="range"
              min="0"
              max={
                activeDuration ||
                0
              }
              step="0.01"
              value={
                currentTime
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
              aria-label="Playback position"
            />

            <span>
              {formatDuration(
                activeDuration
              )}
            </span>

          </div>

        </div>

        <button
          type="button"
          className="bottom-player__close"
          onClick={
            stopSound
          }
          aria-label="Stop audio"
        >
          ×
        </button>

      </div>

    </aside>
  );
}

export default BottomPlayer;