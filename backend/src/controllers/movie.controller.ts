import { getAllMovies } from "../services/movie.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getMovies = asyncHandler(async (req, res, next) => {
  const movies = await getAllMovies();
  res.status(200).json(movies);
});
