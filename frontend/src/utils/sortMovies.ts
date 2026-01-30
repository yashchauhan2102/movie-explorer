import type { SortBy } from "../types/filters";
import type { IMovie } from "../types/movie";

export function sortMovies(movies: IMovie[], sortBy: SortBy): IMovie[] {
  if (sortBy === "none") {
    return movies;
  }

  return [...movies].sort((a, b) => {
    if (sortBy === "rating") {
      return (b.rating ?? 0) - (a.rating ?? 0);
    }

    if (sortBy === "year") {
      return b.year - a.year;
    }

    return 0;
  });
}
