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
  const { search } = req.query as { search: string };

  if (!search) {
    return res.status(400).json({ message: "search term is required" });
  }

  const dbMovies = await movieRepository.searchByMovieTitle(search);

  if (dbMovies.length > 0) {
    return res.status(200).json({
      success: true,
      data: dbMovies,
    });
  }

  const omdbMovies = await fetchMoviesFromOmdb(search);

  const ALLOWED_TYPES = new Set(["movie", "series", "episode"]);

  const filteredOmdbMovies = omdbMovies.filter((movie) =>
    ALLOWED_TYPES.has(movie.Type),
  );

  await movieRepository.saveMany(filteredOmdbMovies.map(mapOmdbToMovieEntity));

  const movies = await movieRepository.searchByMovieTitle(search);

  res.json({
    success: true,
    data: movies,
  });
});
