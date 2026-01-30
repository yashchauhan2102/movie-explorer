import type { IMovie, MovieDTO } from "../types/movie";

export function mapBackendMovieToUi(movie: MovieDTO): IMovie {
  return {
    id: movie.imdb_id,
    title: movie.title,
    year: movie.year,
    poster: movie.poster,
    rating: movie.imdb_rating,
    type: movie.type,
  };
}
