import type { IMovie } from "../types/movies";
import { MovieCard } from "./MovieCard";

export const MovieList = ({ movieList }: { movieList: IMovie[] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {movieList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};
