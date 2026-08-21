import {
  useEffect,
  useState,
} from "react";

import SearchBar
  from "../components/SearchBar";

import SoundGrid
  from "../components/SoundGrid";

import {
  searchSounds,
} from "../api/freesound";

import {
  normalizeSound,
} from "../utils/normalizeSound";

import {
  useAudioPlayer,
} from "../hooks/useAudioPlayer";

function Ringtones() {
  const [
    sounds,
    setSounds,
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

  useEffect(() => {
    async function loadSounds() {
      try {
        setLoading(true);

        setError("");

        const data =
          await searchSounds(
            "ringtone notification",
            1,
            24
          );

        setSounds(
          data.results.map(
            normalizeSound
          )
        );
      } catch (error) {
        console.error(
          error
        );

        setError(
          "We couldn't load ringtones."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSounds();
  }, []);

  return (
    <section className="section">

      <div className="container">

        <h1 className="section-title">
          Explore Sounds
        </h1>

        <p className="section-description">
          Browse ringtones,
          notifications and
          short audio effects.
        </p>

        <div
          style={{
            marginTop:
              "28px",
          }}
        >
          <SearchBar />
        </div>

        <div
          style={{
            marginTop:
              "38px",
          }}
        >

          {loading && (
            <p>
              Loading sounds...
            </p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            sounds.length >
              0 && (
              <SoundGrid
                sounds={
                  sounds
                }
                audioPlayer={
                  audioPlayer
                }
              />
            )}

        </div>

      </div>

    </section>
  );
}

export default Ringtones;