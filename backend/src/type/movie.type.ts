export type IMovie = {
  title: string;
  year: number;
  imdbId: string;
  poster: string | null;
  imdbRating: number;
  type: "movie" | "series" | "episode";
};
