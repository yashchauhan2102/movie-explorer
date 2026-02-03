import { useMemo, useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { FilterBar } from "./components/FilterBar";
import { filterMovies } from "./utils/filterMovies";
import { useDebounce } from "./hooks/useDebounce";
import { useMovieSearch } from "./hooks/useMovieSearch";
import type { SortBy } from "./types/filters";
import { sortMovies } from "./utils/sortMovies";
import { Pagination } from "./components/Pagination";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortBy>("none");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const { movies, isLoading, error, totalPages } = useMovieSearch(
    debouncedSearchTerm,
    page,
    limit,
  );

  const filteredAndSortedMovies = useMemo(
    () =>
      sortMovies(
        filterMovies(movies, debouncedSearchTerm, selectedType),
        sortBy,
      ),
    [movies, debouncedSearchTerm, selectedType, sortBy],
  );

  return (
    <div className="app_container">
      <div className="app_content ">
        <FilterBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className="movie_content">
          {isLoading && <p>Loading movies...</p>}

          {!isLoading && error && (
            <>
              <p>Error while fetching movies</p>
              <p>Error: {error}</p>
            </>
          )}

          {!isLoading && !error && (
            <MovieList movieList={filteredAndSortedMovies} />
          )}
        </div>
      </div>
      <Pagination
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;
