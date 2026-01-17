export interface SearchMoviesDTO {
  searchTerm: string;
  type?: "movie" | "series" | "episode";
}
