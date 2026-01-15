import type { IMovie } from "../types/movie";

export function filterMovies(
  movies: IMovie[],
  searchTerm: string,
  selectedType: string
): IMovie[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return movies.filter((movie) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      movie.title.toLowerCase().includes(normalizedSearch);

    const matchesType = selectedType === "all" || movie.type === selectedType;

    return matchesSearch && matchesType;
  });
}
