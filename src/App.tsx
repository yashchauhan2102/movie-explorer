import "./App.css";
import { MovieList } from "./components/MovieList";
import { SearchBar } from "./components/SearchBar";
import { movieList } from "./data/movies";

function App() {
  return (
    <div className="app_container">
      <SearchBar />
      <MovieList movieList={movieList} />
    </div>
  );
}

export default App;
