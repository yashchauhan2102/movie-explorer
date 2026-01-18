export interface IOmdbMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: "movie" | "series" | "episode";
}

export interface IOmdbSearchResponse {
  Search?: IOmdbMovie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}
