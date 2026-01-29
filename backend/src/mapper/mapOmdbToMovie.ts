import { IOmdbMovie } from "../dtos/omdb.dto";
import { IMovie } from "../type/movie.type";

export function mapOmdbToMovieEntity(omdb: IOmdbMovie): IMovie {
  const year = parseInt(omdb.Year, 10);
  return {
    title: omdb.Title,
    year: Number.isNaN(year) ? 0 : year,
    poster: omdb.Poster !== "N/A" ? omdb.Poster : null,
    imdbId: omdb.imdbID,
    type: omdb.Type.toLowerCase().trim() as "movie" | "series" | "episode",
    imdbRating: 0,
  };
}
