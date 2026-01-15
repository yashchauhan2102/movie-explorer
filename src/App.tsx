import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { FilterBar } from "./components/FilterBar";
import { filterMovies } from "./utils/filterMovies";
import type { IMovie } from "./types/movie";
import { MOVIE_URL } from "./constants/urls";
import { mapOmdbMovieToMovie } from "./utils/mapOmdbMovies";
import type { IOmdbSearchResponse } from "./types/omdb";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filteredMovies = useMemo(
    () => filterMovies(movies, searchTerm, selectedType),
    [movies, searchTerm, selectedType]
  );

  useEffect(() => {
    const trimmed = searchTerm.trim();

    // 🔑 RESET STATE when input is cleared
    if (trimmed.length === 0) {
      setMovies([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    // ⛔ Too short → no fetch, but clean UI
    if (trimmed.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    setError(null);

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          MOVIE_URL.replace("${SEARCH_TERM}", searchTerm),
          { signal: controller.signal }
        );

        const data: IOmdbSearchResponse = await response.json();

        if (data.Response === "False") {
          console.log("Error: ", data.Error);
          if (
            data.Error === "Too many results." ||
            data.Error === "Movie not found!"
          ) {
            setMovies([]);
            setError(null);
            return;
          }

          throw new Error(data.Error);
        }

        setMovies(data.Search.map(mapOmdbMovieToMovie));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [searchTerm]);

  if (isLoading) {
    return <p>Loading Movies...</p>;
  }

  if (error) {
    return (
      <>
        <p>Error while fetching movies !! Please try again Later</p>
        <p>Error: {error}</p>
      </>
    );
  }
  return (
    <div className="app_container">
      <FilterBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
      />
      <MovieList movieList={filteredMovies} />
    </div>
  );
}

export default App;
