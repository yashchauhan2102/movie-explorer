import { useState } from "react";
import "./App.css";
import { MovieList } from "./components/MovieList";
import { SearchBar } from "./components/SearchBar";
import { movieList } from "./data/movies";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredMovies = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app_container">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <MovieList movieList={filteredMovies} />
    </div>
  );
}

export default App;
