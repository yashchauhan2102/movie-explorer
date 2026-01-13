import { useMemo, useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { FilterBar } from "./components/FilterBar";
import { movieList } from "./data/movies";
import { filterMovies } from "./utils/filterMovies";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const filteredMovies = useMemo(
    () => filterMovies(movieList, searchTerm, selectedGenre),
    [movieList, searchTerm, selectedGenre]
  );

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
