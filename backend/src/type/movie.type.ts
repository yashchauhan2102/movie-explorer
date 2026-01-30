export interface IMovie {
  title: string;
  year: number;
  imdb_id: string;
  poster: string | null;
  imdb_rating: number;
  type: IMovieType;
}

export type IMovieType = "movie" | "series" | "episode";

export const ALLOWED_TYPES = new Set(["movie", "series", "episode"]);
