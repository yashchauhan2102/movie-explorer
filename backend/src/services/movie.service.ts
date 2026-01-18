import { RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { MovieEntity } from "../entities/movie.entity";
import { IOmdbMovie } from "../dtos/omdb.dto";

export async function getAllMovies(): Promise<MovieEntity[]> {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT 
        id,
        imdb_id AS imdbId,
        title,
        year,
        type,
        poster,
        created_at AS createdAt
    FROM movies
    ORDER BY created_at DESC
    `);

  return rows as MovieEntity[];
}

export async function saveMoviesFromOmdb(movies: IOmdbMovie[]): Promise<void> {
  if (movies.length === 0) {
    return;
  }

  const values = movies.map((movie) => {
    const year = parseInt(movie.Year, 10);

    return [
      movie.imdbID,
      movie.Title,
      Number.isNaN(year) ? 0 : year,
      movie.Type,
      movie.Poster === "N/A" ? null : movie.Poster,
    ];
  });

  await pool.query(
    `
    INSERT INTO movies (imdb_id, title, year, type, poster)
    VALUES ?
    ON DUPLICATE KEY UPDATE
      title = VALUES(TITLE),
      year = VALUES(year),
      type = VALUES(type),
      poster = VALUES(poster)
    `,
    [values],
  );
}
