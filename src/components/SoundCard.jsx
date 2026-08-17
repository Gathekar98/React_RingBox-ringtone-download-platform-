// import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./SoundCard.css";

function SoundCard({ sound, audioPlayer }){
    const {
        currentSoundId,
        isPlaying,
        currentTime,
        duration,
        playSound,
        seek,
    } = audioPlayer;

    const isActive = currentSoundId === sound.id;
    const activeCurrentTime = isActive ? currentTime : 0;
    const activeDuration = isActive ? duration || sound.duration : sound.duration;
    const progress = activeDuration > 0 ? (activeCurrentTime / activeDuration) * 100 : 0;

    const formatDuration = (seconds = 0) => {
        const safeSeconds = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return  `${minutes}:${remainingSeconds.toString().padStart(2,"0")}`;
    };

    const handleSeek = (event) =>{
        if(!isActive) return;

        const newTime= Number(event,EventTarget.value);
        seek(newTime);
    }

    return(
        <article className="sound-card">
            <div className="sound-car__waveform">
                {sound.waveform ? (
                    <img  src={sound.waveform} alt=""/>
                ) : (
                    <div className="sound-card__wave-placeholder">
                        ♫
                    </div>
                )}

                <button className="sound-card__play"
                    onClick={() => playSound(sound)}
                    disabled={!sound.preview}
                    aria-label={
                       !sound.preview
                        ? `Preview unavailable for ${sound.title}`
                        : isActive && isPlaying
                        ? `Pause ${sound.title}`
                        : `Play ${sound.title}`
                    }
                >
                    {!sound.preview ? "x" : isActive && isPlaying ? "❚❚" : "▶"}
                </button>
            </div>

            <div className="sound-card__content">
                <div className="sound-card__top">
                    <Link 
                        to={`/sound/${sound.id}`}
                        className="sound-card__title"
                    >
                        {sound.title}
                    </Link>
                    <span className="sound-card__duration">
                        {formatDuration(activeDuration)}
                    </span>
                </div>
                
                <p className="sound-card__creator">
                    by {sound.creator}
                </p>
                <div className="sound-card__progress-wrap">
                    <input 
                        className="sound-card_progress"
                        type="range"
                        min="0"
                        max={activeDuration || 0}
                        step="0.01"
                        value={activeCurrentTime}
                        onChange={handleSeek}
                        disabled={!isActive}
                        aria-label={`Playback position for ${sound.title}`}
                    />
                </div>

                <div className="sound-card__time">
                    <span>
                        {formatDuration(activeCurrentTime)}
                    </span>
                    <span>
                        {formatDuration(activeDuration)}
                    </span>
                </div>

                <div className="sound-card__footer">
                    <span>
                        ↓ {sound.downloads.toLocaleString()}
                    </span>
                    <span>
                        ★ {sound.rating.toFixed(1)}
                    </span>
                </div>
            </div>
        </article>
    );
}
export default SoundCard;