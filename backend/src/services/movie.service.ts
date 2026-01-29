import { MovieEntity } from "../entities/movie.entity";
import * as movieRepository from "../repositories/movie.repository";

export async function getAllMovies(): Promise<MovieEntity[]> {
  return movieRepository.findAll();
}

// export async function saveMoviesFromOmdb(
//   movies: IOmdbMovie[],
// ): Promise<MovieEntity[] | void> {
//   if (movies.length === 0) {
//     return;
//   }

//   const values: MovieEntity = movies.map((movie) => {
//     const year = parseInt(movie.Year, 10);

//     return [
//       movie.imdbID,
//       movie.Title,
//       Number.isNaN(year) ? 0 : year,
//       movie.Type,
//       movie.Poster === "N/A" ? null : movie.Poster,
//     ];
//   });

//   return movieRepository.saveMany(values);
// }
