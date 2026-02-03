import type { IMovie, MovieDTO, PaginatedMovieDTO } from "../types/movie";
import { mapBackendMovieToUi } from "../utils/mapBackendMovies";

export async function fetchMoviesBySearchTerm(
  searchTerm: string,
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PaginatedMovieDTO<IMovie>> {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/movies/search?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`,
    {
      signal: signal,
    },
  );

  if (!res.ok) {
    throw new Error("Search failed");
  }

  const result: PaginatedMovieDTO<MovieDTO> = await res.json();
  const data: PaginatedMovieDTO<IMovie> = {
    ...result,
    data: result.data.map(mapBackendMovieToUi),
  };

  return data;
}

export async function fetchAllMovies(): Promise<IMovie[]> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/movies`);

  if (!res.ok) {
    throw new Error("Failed to fetch movies from backend");
  }

  const json = await res.json();
  return json.data;
}
