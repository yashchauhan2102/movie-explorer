import { useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { FilterBar } from "./components/FilterBar";
import { movieList } from "./data/movies";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const filteredMovies = movieList
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((movie) =>
      selectedGenre === "all" ? true : movie.genre === selectedGenre
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
