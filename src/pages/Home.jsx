import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import SoundGrid from "../components/SoundGrid";

import { normalizeSound } from "../utils/normalizeSound";
import { searchSounds } from "../api/freesound";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

function Home() {
  const [sounds, setSounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const audioPlayer = useAudioPlayer();

  useEffect(()=>{
    async function loadSounds(){
      try{
        setLoading(true);

        const data = await searchSounds(
          "notification ringtone",
          1,
          12
        );
        const normalizedSounds = data.results.map(normalizeSound);
        setSounds(normalizedSounds);
      }
      catch(error){
        console.error(error);
        setError("we couldn't load sounds right now");
      }
      finally{
        setLoading(false);
      }
    }

    loadSounds();
  }, []);

  return (
    <>
      <Hero />
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            Trending Sounds
          </h2>
          <p className="section-description">
            Discover popular short sound from the Ringbox collection.
          </p>
          <div style={{marginTop : "32px"}}>
            {loading && (
              <p>Loading sounds...</p>
            )}
            {error && (
              <p>{error}</p>
            )}
            {!loading &&
              !error &&
              sounds.length > 0 && (
              <SoundGrid sounds={sounds} audioPlayer={audioPlayer}/>
              )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;