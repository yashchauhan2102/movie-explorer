import { MOVIE_URL } from "../constants/urls";
import type { IMovie } from "../types/movie";
import type { IOmdbSearchResponse } from "../types/omdb";
import { mapOmdbMovieToMovie } from "../utils/mapOmdbMovies";

export async function fetchMoviesBySearchTerm(
  searchTerm: string,
  signal?: AbortSignal,
): Promise<IMovie[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/movies`, {
    signal: signal,
  });

  const data = await response.json();
  console.log(data);

  if (data.Response === "False") {
    console.log("Error: ", data.Error);
    if (
      data.Error === "Too many results." ||
      data.Error === "Movie not found!"
    ) {
      return [];
    }

    throw new Error(data.Error);
  }

  return data.map(mapOmdbMovieToMovie);
}

export async function fetchMoviesFromBackend(): Promise<IMovie[]> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/movies`);

  if (!res.ok) {
    throw new Error("Failed to fetch movies from backend");
  }

  const json = await res.json();
  return json.data;
}
