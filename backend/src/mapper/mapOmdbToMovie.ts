import { OmdbMovieDTO } from "../dtos/omdb.dto";
import { CreateMovie, MovieType } from "../type/movie.type";

export function mapOmdbToMovieEntity(omdb: OmdbMovieDTO): CreateMovie {
  const year = parseInt(omdb.Year, 10);
  return {
    title: omdb.Title,
    year: Number.isNaN(year) ? 9999 : year,
    poster: omdb.Poster !== "N/A" ? omdb.Poster : null,
    imdb_id: omdb.imdbID,
    type: omdb.Type.toLowerCase().trim() as MovieType,
    imdb_rating: parseFloat((Math.random() * 10).toFixed(1)),
  };
}
