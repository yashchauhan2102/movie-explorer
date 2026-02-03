import { getAllMovies, searchMoviesByTitle } from "../services/movie.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getMovies = asyncHandler(async (req, res, next) => {
  const movies = await getAllMovies();
  res.status(200).json(movies);
});

export const searchMovies = asyncHandler(async (req, res, next) => {
  const searchTerm = req.query.search as string;
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limitRaw = parseInt(req.query.limit as string) || 10;
  const limit = Math.min(limitRaw, 50);

  const data = await searchMoviesByTitle(searchTerm, page, limit);

  res.status(200).json(data);
});
