import { useEffect, useState } from "react";
import type { IMovie } from "../types/movie";
import { fetchMoviesBySearchTerm } from "../services/movieService";

export function useMovieSearch(
  searchTerm: string,
  page: number,
  limit: number,
) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmed = searchTerm.trim();

    // RESET STATE when input is cleared
    if (trimmed.length === 0) {
      setMovies([]);
      setTotalPages(0);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Too short → no fetch, but clean UI
    if (trimmed.length < 3) {
      setMovies([]);
      setTotalPages(0);
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
          page,
          limit,
          controller.signal,
        );

        setMovies(result.data);
        setTotalPages(result.totalPages);
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
  }, [searchTerm, page, limit]);

  return { movies, isLoading, error, totalPages };
}
