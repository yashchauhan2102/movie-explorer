import { MOVIE_URL } from "../constants/urls";
import type { IMovie } from "../types/movie";
import type { IOmdbSearchResponse } from "../types/omdb";
import { mapOmdbMovieToMovie } from "../utils/mapOmdbMovies";

export async function fetchMoviesBySearchTerm(
  searchTerm: string,
  signal?: AbortSignal
): Promise<IMovie[]> {
  const response = await fetch(
    MOVIE_URL.replace("${SEARCH_TERM}", searchTerm),
    {
      signal: signal,
    }
  );

  const data: IOmdbSearchResponse = await response.json();

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

  return data.Search.map(mapOmdbMovieToMovie);
}
