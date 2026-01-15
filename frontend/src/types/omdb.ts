export interface IOmdbMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface IOmdbSearchResponse {
  Search: IOmdbMovie[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
}
