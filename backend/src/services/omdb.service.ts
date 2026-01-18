import { IOmdbSearchResponse } from "../dtos/omdb.dto";

const OMDB_URL = "https://www.omdbapi.com/";

export async function fetchMoviesFromOmdb(searchTerm: string) {
  const response = await fetch(
    `${OMDB_URL}?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(
      searchTerm,
    )}`,
  );

  const data = (await response.json()) as IOmdbSearchResponse;

  if (data.Response === "False") {
    return [];
  }

  return data.Search ?? [];
}
