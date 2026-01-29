import { useMemo, useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { FilterBar } from "./components/FilterBar";
import { filterMovies } from "./utils/filterMovies";
import { useDebounce } from "./hooks/useDebounce";
import { useMovieSearch } from "./hooks/useMovieSearch";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const { movies, isLoading, error } = useMovieSearch(debouncedSearchTerm);

  const filteredMovies = useMemo(
    () => filterMovies(movies, debouncedSearchTerm, selectedType),
    [movies, debouncedSearchTerm, selectedType],
  );

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
