import type { IMovie } from "../types/movie";
import type { IOmdbMovie } from "../types/omdb";

export function mapOmdbMovieToMovie(omdb: IOmdbMovie): IMovie {
  console.log("omdb-> ", omdb);
  return {
    id: omdb.imdbId,
    title: omdb.title,
    year: omdb.year,
    type: omdb.type,
    poster: omdb.poster,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
  };
}
