import { OMDB_URL } from "../constant/omdb.constant";
import { OmdbMovieDTO, OmdbSearchResponseDTO } from "../dtos/omdb.dto";

export async function fetchMoviesFromOmdb(
  searchTerm: string,
): Promise<OmdbMovieDTO[]> {
  const response = await fetch(
    `${OMDB_URL}?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(
      searchTerm,
    )}`,
  );

  const data = (await response.json()) as OmdbSearchResponseDTO;

  if (data.Response === "False") {
    return [];
  }

  return data.Search ?? [];
}
