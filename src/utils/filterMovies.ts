import type { IMovie } from "../types/movie";

export const filterMovies = (
  movieList: IMovie[],
  searchTerm: string,
  selectedType: string
): IMovie[] =>
  movieList
    ?.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((movie) =>
      selectedType === "all" ? true : movie.type === selectedType
    );
