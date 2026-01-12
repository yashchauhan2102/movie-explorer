import type { IMovie } from "../types/movies";

export const MovieCard = ({ movie }: { movie: IMovie }) => {
  return (
    <div style={{ border: "1px solid #444", padding: "12px" }}>
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <p>{movie.genre}</p>
      <p>{movie.rating}</p>
    </div>
  );
};
