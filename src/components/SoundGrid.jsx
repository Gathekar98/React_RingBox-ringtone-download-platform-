import SoundCard from "./SoundCard";
import "./SoundGrid.css";

function SoundGrid({
  sounds,
  audioPlayer,
  favorites,
}) {
  return (
    <div className="sound-grid">
      {sounds.map((sound) => (
        <SoundCard
          key={sound.id}
          sound={sound}
          audioPlayer={audioPlayer}
          favorites={favorites}
        />
      ))}
    </div>
  );
}

export default SoundGrid;