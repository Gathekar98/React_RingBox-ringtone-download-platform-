import SoundCard from "./SoundCard";
import "./SoundGrid.css";

function SoundGrid({ sounds, audioPlayer }){
    return (
        <div className="sound-grid">
            {sounds.map((sound)=> (
                <SoundCard
                    key={sound.id}
                    sound={sound}
                    audioPlayer={audioPlayer}
                />
            ))}
        </div>
    );
}
export default SoundGrid;