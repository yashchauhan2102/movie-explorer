export interface IMovie {
  id: string;
  title: string;
  year: number;
  rating: number;
  type: "movie" | "series" | "episode";
  poster: string | null;
}

export type MovieDTO = {
  title: string;
  year: number;
  imdb_id: string;
  poster: string | null;
  imdb_rating: number;
  type: "movie" | "series" | "episode";
};
