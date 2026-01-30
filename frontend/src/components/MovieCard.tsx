import type { IMovie } from "../types/movie";
import defaultPoster from "../assets/default_poster.png";

interface IMovieCardProps {
  movie: IMovie;
}

export const MovieCard = ({ movie }: IMovieCardProps) => {
  const { title, year, type, rating, poster } = movie;
  return (
    <div style={{ border: "1px solid #444", padding: "12px" }}>
      <h3>{title}</h3>
      <p>{year}</p>
      <p>{type}</p>
      <p>⭐ {rating ?? "N/A"}</p>
      <img src={poster ?? defaultPoster} alt="Movie_Poster_Image" />
    </div>
  );
};
