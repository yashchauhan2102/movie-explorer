import type { IMovie } from "../types/movie";

export function mapBackendMovieToUi(movie: IMovie): IMovie {
  return {
    id: movie.id.toString(),
    title: movie.title,
    year: movie.year,
    poster: movie.poster,
    rating: movie.rating,
    type: "",
  };
}
