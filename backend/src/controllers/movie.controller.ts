import { getAllMovies, saveMoviesFromOmdb } from "../services/movie.service";
import { fetchMoviesFromOmdb } from "../services/omdb.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getMovies = asyncHandler(async (req, res, next) => {
  const movies = await getAllMovies();
  res.status(200).json(movies);
});

export const searchMovies = asyncHandler(async (req, res, next) => {
  const { searchTerm } = req.query as { searchTerm: string };
  const externalMovies = await fetchMoviesFromOmdb(searchTerm);

  await saveMoviesFromOmdb(externalMovies);

  const movies = await getAllMovies();

  res.status(200).json(movies);
});
