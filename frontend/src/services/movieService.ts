import type { IMovie } from "../types/movie";
import { mapBackendMovieToUi } from "../utils/mapBackendMovies";

export async function fetchMoviesBySearchTerm(
  searchTerm: string,
  signal?: AbortSignal,
): Promise<IMovie[]> {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/movies/search?search=${encodeURIComponent(searchTerm)}`,
    {
      signal: signal,
    },
  );

  if (!res.ok) {
    throw new Error("Search failed");
  }

  const json = await res.json();

  return json.data.map(mapBackendMovieToUi);
}

export async function fetchAllMoviesFromBackend(): Promise<IMovie[]> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/movies`);

  if (!res.ok) {
    throw new Error("Failed to fetch movies from backend");
  }

  const json = await res.json();
  return json.data;
}
