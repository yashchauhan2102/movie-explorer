import type { IMovie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface IMovieListProps {
  movieList: IMovie[];
}

export const MovieList = ({ movieList }: IMovieListProps) => {
  if (movieList.length === 0) {
    return <p>No Movies Found !!</p>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {movieList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};
