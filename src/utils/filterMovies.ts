import type { IMovie } from "../types/movie";

export const filterMovies = (
  movieList: IMovie[],
  searchTerm: string,
  selectedGenre: string
): IMovie[] =>
  movieList
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((movie) =>
      selectedGenre === "all" ? true : movie.genre === selectedGenre
    );
