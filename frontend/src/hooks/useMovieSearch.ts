import { useEffect, useState } from "react";
import type { IMovie } from "../types/movie";
import { fetchMoviesBySearchTerm } from "../services/movieService";

export function useMovieSearch(searchTerm: string) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmed = searchTerm.trim();

    // RESET STATE when input is cleared
    if (trimmed.length === 0) {
      setMovies([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Too short → no fetch, but clean UI
    if (trimmed.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    setError(null);

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await fetchMoviesBySearchTerm(
          trimmed,
          controller.signal,
        );

        setMovies(result);
      } catch (err) {
        console.error((err as Error).message);
        if ((err as Error).name !== "AbortError") {
          setError("Failed to fetch movies. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [searchTerm]);

  return { movies, isLoading, error };
}
