import { MovieEntity } from "../entities/movie.entity";
import { mapOmdbToMovieEntity } from "../mapper/mapOmdbToMovie";
import { ALLOWED_TYPES, CreateMovie } from "../type/movie.type";
import * as movieRepository from "../repositories/movie.repository";
import * as omdbService from "./omdb.service";

export async function getAllMovies(): Promise<MovieEntity[]> {
  // Return all movies stored in DB
  return movieRepository.findAll();
}

export async function searchMoviesByTitle(
  searchTerm: string,
): Promise<MovieEntity[]> {
  // DB first
  const dbMovies = await movieRepository.searchByMovieTitle(searchTerm);

  if (dbMovies.length > 0) {
    return dbMovies;
  }

  // OMDB fallback guarded
  let omdbMovies;

  try {
    omdbMovies = await omdbService.fetchMoviesFromOmdb(searchTerm);
  } catch (err) {
    console.error("OMDb fetch failed:", err);
    // Graceful degradation
    return [];
  }

  // Filter domain allowed types
  const filteredOmdbMovies = omdbMovies.filter((movie) =>
    ALLOWED_TYPES.has(movie.Type),
  );

  // Map OmdbDTO → IMovie
  const createMovie: CreateMovie[] =
    filteredOmdbMovies.map(mapOmdbToMovieEntity);

  // Persist
  await movieRepository.saveMany(createMovie);

  // Return DB truth
  return movieRepository.searchByMovieTitle(searchTerm);
}
