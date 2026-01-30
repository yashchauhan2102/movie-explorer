export type IMovie = {
  title: string;
  year: number;
  imdb_id: string;
  poster: string | null;
  imdb_rating: number;
  type: "movie" | "series" | "episode";
};
