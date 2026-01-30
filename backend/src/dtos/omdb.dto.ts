export interface OmdbMovieDTO {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: "movie" | "series" | "episode";
}

export interface OmdbSearchResponseDTO {
  Search?: OmdbMovieDTO[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}
