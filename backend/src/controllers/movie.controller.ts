import { getAllMovies } from "../services/movie.service";
import { fetchMoviesFromOmdb } from "../services/omdb.service";
import { asyncHandler } from "../utils/asyncHandler";
import * as movieRepository from "../repositories/movie.repository";
import { mapOmdbToMovieEntity } from "../mapper/mapOmdbToMovie";

export const getMovies = asyncHandler(async (req, res, next) => {
  const movies = await getAllMovies();
  res.status(200).json(movies);
});

export const searchMovies = asyncHandler(async (req, res, next) => {
  const { searchTerm } = req.query as { searchTerm: string };

  if (!searchTerm) {
    return res.status(400).json({ message: "search term is required" });
  }

  const dbMovies = await movieRepository.searchByMovieTitle(searchTerm);

  if (dbMovies.length > 0) {
    return dbMovies;
  }

  const omdbMovies = await fetchMoviesFromOmdb(searchTerm);

  await movieRepository.saveMany(omdbMovies.map(mapOmdbToMovieEntity));

  res.json({
    success: true,
    data: movieRepository.searchByMovieTitle(searchTerm),
  });
});
