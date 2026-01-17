export interface MovieEntity {
  id: number;
  imdbId: string;
  title: string;
  year: number;
  type: "movie" | "series" | "episode";
  poster: string | null;
  createdAt: Date;
}
