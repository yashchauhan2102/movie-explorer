import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { FilterBar } from "./components/FilterBar";
import { movieList } from "./data/movies";
import { filterMovies } from "./utils/filterMovies";
import type { IMovie } from "./types/movie";
import { MOVIE_URL } from "./constants/urls";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filteredMovies = useMemo(
    () => filterMovies(movieList, searchTerm, selectedGenre),
    [movieList, searchTerm, selectedGenre]
  );

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(MOVIE_URL);

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
      />
      <MovieList movieList={filteredMovies} />
    </div>
  );
}

export default App;
