import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { FilterBar } from "./components/FilterBar";
import { filterMovies } from "./utils/filterMovies";
import type { IMovie } from "./types/movie";
import { useDebounce } from "./hooks/useDebounce";
import { fetchMoviesBySearchTerm } from "./services/movieService";

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

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    const trimmed = debouncedSearchTerm.trim();

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

        const result = await fetchMoviesBySearchTerm(
          trimmed,
          controller.signal
        );

        setMovies(result);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [debouncedSearchTerm]);

  return (
    <div className="app_container">
      <div className="app_content ">
        <FilterBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />
        <div className="movie_content">
          {isLoading && <p>Loading movies...</p>}

          {!isLoading && error && (
            <>
              <p>Error while fetching movies</p>
              <p>Error: {error}</p>
            </>
          )}

          {!isLoading && !error && <MovieList movieList={filteredMovies} />}
        </div>
      </div>
    </div>
  );
}

export default App;
