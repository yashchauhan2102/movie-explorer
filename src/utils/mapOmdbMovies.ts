import type { IMovie } from "../types/movie";
import type { IOmdbMovie } from "../types/omdb";

export function mapOmdbMovieToMovie(omdb: IOmdbMovie): IMovie {
  return {
    id: omdb.imdbID,
    title: omdb.Title,
    year: omdb.Year,
    type: omdb.Type,
    poster: omdb.Poster,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
  };
}
