import { MovieEntity } from "../entities/movie.entity";
import { mapOmdbToMovieEntity } from "../mapper/mapOmdbToMovie";
import {
  ALLOWED_TYPES,
  CreateMovie,
  PaginatedResult,
} from "../type/movie.type";
import * as movieRepository from "../repositories/movie.repository";
import * as omdbService from "./omdb.service";

export async function getAllMovies(): Promise<MovieEntity[]> {
  // Return all movies stored in DB
  return movieRepository.findAll();
}

export async function searchMoviesByTitle(
  searchTerm: string,
  page: number,
  limit: number,
): Promise<PaginatedResult<MovieEntity>> {
  const offset = (page - 1) * limit;

  // DB first
  const { movies, total } = await movieRepository.searchByMovieTitlePaginated(
    searchTerm,
    limit,
    offset,
  );

  // OMDB fallback guarded
  //  only if:
  // - page === 1
  // - DB has no data
  if (movies.length === 1 && page === 1) {
    let omdbMovies;
    try {
      omdbMovies = await omdbService.fetchMoviesFromOmdb(searchTerm);
    } catch (err) {
      console.error("OMDb fetch failed:", err);
      // Graceful degradation
      return buildPaginatedResponse([], page, limit, total);
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

    // Re-query DB after save
    const retry = await movieRepository.searchByMovieTitlePaginated(
      searchTerm,
      limit,
      offset,
    );

    return buildPaginatedResponse(retry.movies, page, limit, retry.total);
  }

  return buildPaginatedResponse(movies, page, limit, total);
}

const buildPaginatedResponse = (
  data: MovieEntity[],
  page: number,
  limit: number,
  total: number,
) => {
  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};
