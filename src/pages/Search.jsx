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

function Search() {
  const PAGE_SIZE = 20;

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const query =
    searchParams.get("q") ||
    "";

  const pageFromUrl =
    Number(
      searchParams.get("page")
    ) || 1;

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

  const [
    totalResults,
    setTotalResults,
  ] = useState(0);

  const audioPlayer =
    useAudioPlayer();

  useEffect(() => {
    async function loadSearchResults() {
      const cleanQuery =
        query.trim();

      if (!cleanQuery) {
        setSounds([]);
        setTotalResults(0);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await searchSounds(
            cleanQuery,
            pageFromUrl,
            PAGE_SIZE
          );

        setSounds(
          data.results.map(
            normalizeSound
          )
        );

        setTotalResults(
          data.count || 0
        );
      } catch (error) {
        console.error(
          "Search failed:",
          error
        );

        setError(
          "We couldn't load search results."
        );

        setSounds([]);
      } finally {
        setLoading(false);
      }
    }

    loadSearchResults();
  }, [
    query,
    pageFromUrl,
  ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalResults /
        PAGE_SIZE
      )
    );

  const handlePageChange =
    (page) => {
      setSearchParams({
        q: query,
        page:
          String(page),
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

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
            rain, notifications,
            nature and more.
          </p>
        )}

        <div
          style={{
            marginTop: "26px",
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
            marginTop: "38px",
          }}
        >

          {loading && (
            <p>
              Searching sounds...
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
            sounds.length === 0 && (
              <p className="empty-message">
                No sounds found for
                "{query}".
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
                    pageFromUrl
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

export default Search;