import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

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

function Search() {
  const [
    searchParams,
  ] = useSearchParams();

  const query =
    searchParams.get("q") ||
    "";

  const [
    sounds,
    setSounds,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const audioPlayer =
    useAudioPlayer();

  useEffect(() => {
    async function loadSearchResults() {
      const cleanQuery =
        query.trim();

      if (!cleanQuery) {
        setSounds([]);
        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        setError("");

        console.log(
          "Search page query:",
          cleanQuery
        );

        const data =
          await searchSounds(
            cleanQuery,
            1,
            24
          );

        console.log(
          "Search result count:",
          data.count
        );

        const normalized =
          data.results.map(
            normalizeSound
          );

        console.log(
          "Normalized results:",
          normalized
        );

        setSounds(
          normalized
        );
      } catch (error) {
        console.error(
          "Search failed:",
          error
        );

        setSounds([]);

        setError(
          "We couldn't load search results."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSearchResults();
  }, [query]);

  return (
    <section className="section">

      <div className="container">

        <h1 className="section-title">
          Search Sounds
        </h1>

        {query ? (
          <p className="section-description">
            Showing sounds for{" "}
            <strong>
              "{query}"
            </strong>
          </p>
        ) : (
          <p className="section-description">
            Search for ringtones,
            notifications, rain,
            nature and more.
          </p>
        )}

        <div
          style={{
            marginTop:
              "26px",
          }}
        >
          <SearchBar
            initialValue={
              query
            }
          />
        </div>

        <div
          style={{
            marginTop:
              "38px",
          }}
        >

          {loading && (
            <p>
              Searching for
              sounds...
            </p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            query &&
            sounds.length ===
              0 && (
              <p className="empty-message">
                No sounds found for
                "{query}".
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

export default Search;