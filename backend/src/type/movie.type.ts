export interface CreateMovie {
  title: string;
  year: number;
  imdb_id: string;
  poster: string | null;
  imdb_rating: number;
  type: MovieType;
}

export type MovieType = "movie" | "series" | "episode";

export const ALLOWED_TYPES = new Set(["movie", "series", "episode"]);
