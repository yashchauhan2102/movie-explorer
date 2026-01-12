import type { IMovie } from "../types/movie";

export const MovieCard = ({ movie }: { movie: IMovie }) => {
  const { title, year, genre, rating } = movie;
  return (
    <div style={{ border: "1px solid #444", padding: "12px" }}>
      <h3>{title}</h3>
      <p>{year}</p>
      <p>{genre}</p>
      <p>{rating}</p>
    </div>
  );
};
