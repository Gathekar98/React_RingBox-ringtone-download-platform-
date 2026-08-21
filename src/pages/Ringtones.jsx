import {
  useEffect,
  useState,
} from "react";

import SearchBar
  from "../components/SearchBar";

import SoundGrid
  from "../components/SoundGrid";

import Pagination
  from "../components/Pagination";

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
  const PAGE_SIZE = 20;
  const MAX_VISIBLE_SOUNDS = 100;

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

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    totalResults,
    setTotalResults,
  ] = useState(0);

  const audioPlayer =
    useAudioPlayer();

  useEffect(() => {
    async function loadSounds() {
      try {
        setLoading(true);
        setError("");

        const data =
          await searchSounds(
            "ringtone notification sound",
            currentPage,
            PAGE_SIZE
          );

        const normalized =
          data.results.map(
            normalizeSound
          );

        setSounds(
          normalized
        );

        setTotalResults(
          Math.min(
            data.count || 0,
            MAX_VISIBLE_SOUNDS
          )
        );
      } catch (error) {
        console.error(
          "Unable to load ringtones:",
          error
        );

        setError(
          "We couldn't load ringtones."
        );

        setSounds([]);
      } finally {
        setLoading(false);
      }
    }

    loadSounds();
  }, [currentPage]);

  const totalPages =
    Math.ceil(
      totalResults /
      PAGE_SIZE
    );

  const handlePageChange =
    (page) => {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  return (
    <section className="section">

      <div className="container">

        <h1 className="section-title">
          Explore Sounds
        </h1>

        <p className="section-description">
          Browse a curated collection
          of short ringtones,
          notifications and sound
          effects.
        </p>

        <div
          style={{
            marginTop: "28px",
          }}
        >
          <SearchBar />
        </div>

        <div
          style={{
            marginTop: "38px",
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
            sounds.length > 0 && (
              <>
                <SoundGrid
                  sounds={sounds}
                  audioPlayer={
                    audioPlayer
                  }
                />

                <Pagination
                  currentPage={
                    currentPage
                  }
                  totalPages={
                    totalPages
                  }
                  onPageChange={
                    handlePageChange
                  }
                />
              </>
            )}

        </div>

      </div>

    </section>
  );
}

export default Ringtones;