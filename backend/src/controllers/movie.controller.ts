import { getAllMovies, searchMoviesByTitle } from "../services/movie.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getMovies = asyncHandler(async (req, res, next) => {
  const movies = await getAllMovies();
  res.status(200).json(movies);
});

export const searchMovies = asyncHandler(async (req, res, next) => {
  const { search } = req.query as { search: string };

  if (!search) {
    return res.status(400).json({ message: "search term is required" });
  }

  const movies = await searchMoviesByTitle(search);

  res.status(200).json({
    success: true,
    data: movies,
  });
});
