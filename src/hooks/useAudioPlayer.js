import { useEffect, useRef, useState } from "react";

export function useAudioPlayer() {
    const audioRef = useRef(new Audio());

    const [currentSoundId, setCurrentSounId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(()=>{
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration || 0);
        };
        
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);
         
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    },[]);

    const playSound = async (sound) => {
        const audio = audioRef.current;

        if(!sound.preview) return;

        //same sound: toggle play/pause
        if(currentSoundId === sound.id) {
            if(audio.paused) {
                try{
                    await audio.play();
                    setIsPlaying(true);
                }
                catch(error){
                    console.error("Audio playback failed:", error);
                }
            }
            else{
                audio.pause();
                setIsPlaying(false);
            }

            return;
        }

        //New sound: stop current and load new
        audio.pause();
        audio.src = sound.preview;
        audio.currentTime = 0;

        setCurrentSounId(sound.id);
        setCurrentTime(0);
        setDuration(sound.duration || 0);

        try{
            await audio.play();
            setIsPlaying(true);
        }
        catch(error){
            console.error("Audio playback failed:", error);
        }
    };

    const seek = (time) => {
        const audio = audioRef.current;
        audio.currentTime = time;
        setCurrentTime(time);
    };

    return{
        currentSoundId,
        isPlaying,
        currentTime,
        duration,
        playSound,
        seek,
    };
}