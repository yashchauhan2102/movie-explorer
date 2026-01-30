import { OmdbMovieDTO } from "../dtos/omdb.dto";
import { IMovie, IMovieType } from "../type/movie.type";

export function mapOmdbToMovieEntity(omdb: OmdbMovieDTO): IMovie {
  const year = parseInt(omdb.Year, 10);
  return {
    title: omdb.Title,
    year: Number.isNaN(year) ? 9999 : year,
    poster: omdb.Poster !== "N/A" ? omdb.Poster : null,
    imdb_id: omdb.imdbID,
    type: omdb.Type.toLowerCase().trim() as IMovieType,
    imdb_rating: parseFloat((Math.random() * 10).toFixed(1)),
  };
}
